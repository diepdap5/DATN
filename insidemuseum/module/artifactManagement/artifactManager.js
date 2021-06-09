const storageRepo = require('./../../repositories/storage.js');
const databaseRepo = require('./../../repositories/db.js');
const artifactHistory = require('./artifactHistory.js')
const artifactCrawler = require('./artifactCrawler.js');
const artifactTranslator = require('./artifactTranslator.js')
var fs = require('fs');

async function saveImage(image_stream, organization_item_key, image_url) {
    await storageRepo.saveImage(image_stream, organization_item_key, image_url);
}
async function saveArtifact(museum_name, locale, artifact) {
    await databaseRepo.saveAllNewData(museum_name + '_' + locale, artifact);
}
function transferImageToBase64(museum_name, artifact_id, image_links) {
    var image_name = image_links.split('/').pop();
    var url = '/home/diepdn/DATN/image/' + museum_name + '/' + artifact_id + '/' + image_name
    var imageAsBase64 = fs.readFileSync(url, 'base64');
    return imageAsBase64;
};
module.exports = {
    updateData: async function (museum_id) {
        databaseRepo.deleteCollections(museum_id)
        storageRepo.deleteImage(museum_id)
        await artifactCrawler.getArtifactsList(museum_id).then(async function (res) {
            console.log("Update museum with id: " + museum_id);
            artifactHistory.setUpdateHistory(museum_id);
            res.forEach(async function (artifact) {

                // Get artifact image
                artifact["image_files"] = [];

                await artifactCrawler.getArtifactsImageList(
                    artifact["organization_path_name"],
                    artifact["organization_item_key"]
                )
                    .then(async function (image_list) {
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        artifact["image_files"] = image_list;
                        if (image_list.length == 0) {
                            console.log("Artifact has no images");
                        }
                        saveArtifact(artifact["organization_path_name"], 'ja', artifact);
                    })
                    .catch(function (err) {
                        console.log("Error when get image list");
                    })
                await new Promise(resolve => setTimeout(resolve, 3000));
                // Translate data to English
                await artifactCrawler.getArtifactsEnglish(
                    artifact["organization_path_name"],
                    artifact["organization_item_key"])
                    .then(async function (artifact_en) {
                        if (artifact_en != null) {
                            artifact_en["image_files"] = artifact["image_files"];
                            await artifactTranslator.translateArtifactToEnglish(artifact_en, artifact)
                                .then(async function (res) {
                                    artifact_en = res;
                                    await new Promise(resolve => setTimeout(resolve, 3000));
                                    saveArtifact(artifact_en["organization_path_name"], 'en', artifact_en);
                                })
                                .catch(function (err) {
                                    console.log("Translate fail");
                                });
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }
                        else {
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            await artifactTranslator.translateArtifactToEnglishAll(artifact).then(async function (res) {
                                var artifact_en = res;
                                saveArtifact(artifact_en["organization_path_name"], 'en', artifact_en);
                            })
                                .catch(function (err) {
                                    console.log("Translate to English fail");
                                });
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }

                    })
                    .catch(function (err) {
                        console.log("No english data for artifact " + artifact["organization_item_key"]);
                    })

                // Translate data to Vietnamese
                await new Promise(resolve => setTimeout(resolve, 3000));
                await artifactTranslator.translateArtifactToVietnamese(artifact).then(async function (res) {
                    var artifact_vi = res;
                    saveArtifact(artifact_vi["organization_path_name"], 'vi', artifact_vi);
                })
                    .catch(function (err) {
                        console.log("Translate to Vietnamese fail");
                    });

                // Save image
                await new Promise(resolve => setTimeout(resolve, 10000));
                for (var i = 0; i < artifact["image_files"].length; i++) {
                    await artifactCrawler.getImage(artifact["organization_item_key"],artifact["image_files"][i])
                        .then(async function (res) {
                            await storageRepo.saveImage(res, artifact["organization_item_key"], artifact["image_files"][i]);
                            // console.log('Saved image ' + artifact["organization_item_key"] + '/' + (i + 1).toString())
                        })
                        .catch(function (err) {
                            console.log('Error when taking image: ' + artifact["image_files"][i])
                            console.log(err)
                        })
                }

                // 
            });

        });

    },
    getAllArtifact: async function (locale) {
        var artifacts = await databaseRepo.getLocaleCollection(locale);
        artifacts = artifacts.sort(() => Math.random() - 0.5);
        console.log('Get ' + artifacts.length);
        return artifacts;
    },
    getArtifactById: async function (artifact_id, museum_name, locale) {
        var artifact = await databaseRepo.getArtifactById(museum_name, locale, artifact_id);

        // Convert all image to base64
        var newImageList = new Array();
        artifact["image_files"].forEach(image_links => {
            var image_base64 = transferImageToBase64(museum_name, artifact_id, image_links);
            newImageList.push(image_base64)
        })
        artifact["image_files"] = newImageList;

        // Find relevant
        var relevant_artifact = await databaseRepo.getRelevant(artifact, museum_name, locale);
        // Relevant Data
        var relevant_data = [];
        for (var i = 0; i < relevant_artifact.length; i++) {
            relevant_data.push({
                "organization_item_key": relevant_artifact[i]["organization_item_key"],
                "image_demo": transferImageToBase64(
                    museum_name,
                    relevant_artifact[i]["organization_item_key"],
                    relevant_artifact[i]["image_files"][0]
                )
            })
        }
        artifact["relevant"] = relevant_data
        return artifact;
    },
    getAllArtifactPagination: async function(museum_name, locale, skip_value){
        var artifacts = await databaseRepo.getAllArtifactPagination(museum_name, locale, skip_value)
        artifacts.forEach(artifact => {
            var image_base64 = transferImageToBase64(museum_name, artifact["organization_item_key"], artifact["image_files"][0])
            artifact["image_files"] = image_base64;
        })
        console.log("Get " + artifacts.length.toString() + " artifacts from page " + (skip_value+1));
        return artifacts;
    },
    searchArtifact: async function(museum_name,locale, search_keyword){
        var artifacts = await databaseRepo.search(museum_name,locale, search_keyword)
        artifacts.forEach(artifact => {
            var image_base64 = transferImageToBase64(museum_name, artifact["organization_item_key"], artifact["image_files"][0])
            artifact["image_files"] = image_base64;
        })
        console.log("Search results: " + artifacts.length.toString());
        return artifacts;
    },
    getHistory: async function(){
        var history = await artifactHistory.getUpdateHistory();
        return history;
    },
    getArtifactIdByTitle: async function(museum_name,artifact_title){
        var id = await databaseRepo.getArtifactIdByTitle(museum_name,artifact_title);
        return id;
    }
    
}