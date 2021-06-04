// Get API list
const api = require('./connectMuseum');
const connect_to_db = require('./connectDatabase');
const translate_feature = require('../translate/translate');
module.exports = {
    updateData: async function (museum_id) {
        await api.getArtifactsList(museum_id).then(async function (res) {
            console.log("Update museum with id: " + museum_id);
            connect_to_db.setUpdateHistoryMongoDB(museum_id);
            res.forEach(async function (artifact) {

                // Get artifact image
                artifact["image_files"] = [];

                await api.getArtifactsImageList(
                    artifact["organization_path_name"],
                    artifact["organization_item_key"]
                )
                    .then(async function (image_list) {
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        artifact["image_files"] = image_list;
                        if (image_list.length == 0) {
                            console.log("Artifact has no images");
                        }
                        connect_to_db.setArtifactsMongoDB(artifact["organization_path_name"], 'ja', artifact);
                    })
                    .catch(function (err) {
                        console.log("Error when get image list");
                    })
                await new Promise(resolve => setTimeout(resolve, 3000));
                // connect_to_db.setArtifactsMongoDB(artifact["organization_path_name"], 'ja', artifact);

                // Translate data to English
                await api.getArtifactsEnglish(
                    artifact["organization_path_name"],
                    artifact["organization_item_key"])
                    .then(async function (artifact_en) {
                        if (artifact_en != null) {
                            artifact_en["image_files"] = artifact["image_files"];
                            await translate_feature.translateArtifactToEnglish(artifact_en, artifact)
                                .then(async function (res) {
                                    artifact_en = res;
                                    await new Promise(resolve => setTimeout(resolve, 3000));
                                    connect_to_db.setArtifactsMongoDB(artifact_en["organization_path_name"], 'en', artifact_en);
                                })
                                .catch(function (err) {
                                    console.log("Translate fail");
                                });
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }
                        else {
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            await translate_feature.translateArtifactToEnglishAll(artifact).then(async function (res) {
                                var artifact_en = res;
                                connect_to_db.setArtifactsMongoDB(artifact_en["organization_path_name"], 'en', artifact_en);
                            })
                                .catch(function (err) {
                                    console.log("Translate to English fail" + err);
                                });
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }

                        // connect_to_db.setArtifactsMongoDB(artifact_en["organization_path_name"], 'en', artifact_en);
                    })
                    .catch(function (err) {
                        console.log("No english data for artifact " + artifact["organization_item_key"]);
                    })

                // Translate data to Vietnamese
                await new Promise(resolve => setTimeout(resolve, 3000));
                await translate_feature.translateArtifactToVietnamese(artifact).then(async function (res) {
                    var artifact_vi = res;
                    connect_to_db.setArtifactsMongoDB(artifact_vi["organization_path_name"], 'vi', artifact_vi);
                })
                    .catch(function (err) {
                        console.log("Translate to Vietnamese fail" + err);
                    });

                // Save image
                await new Promise(resolve => setTimeout(resolve, 10000));
                for (var i = 0; i < artifact["image_files"].length; i++) {
                    await api.getArtifactsImage(artifact["organization_item_key"], artifact["image_files"][i])
                        .then(async function (res) {
                            console.log('Saved image ' + artifact["organization_item_key"] + '/' + (i + 1).toString())
                            // await connect_to_db.setImage(artifact["organization_item_key"],artifact["image_files"][i]);
                        })
                        .catch(function (err) {
                            console.log("Error when get artifact image");
                        })
                }

                // 
            });

        });


    }
}
