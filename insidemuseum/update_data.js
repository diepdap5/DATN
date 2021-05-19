// Get API list
const api = require('./module/update_data/connectMuseum');
const connect_to_db = require('./module/update_data/connectDatabase');
const handle = require('./module/update_data/handleData');
const translate_feature = require('./module/translate/translate');
const admin = require('./db.js');
module.exports = {
    updateData: async function () {
        for (var id = 2; id < 3; id++) {
            await api.getArtifactsList(id).then(async function (res) {
                console.log("(Japanese) Update with id: " + id);
                res.forEach(async function (artifact) {
                    // Get artifact image
                    artifact["image_files"] = [];

                    await api.getArtifactsImageList(
                        artifact["organization_path_name"],
                        artifact["organization_item_key"]
                    )
                        .then(function (image_list) {
                            artifact["image_files"] = image_list;
                            if (image_list.length == 0) {
                                console.log("Artifact has no images");
                            }
                        })
                        .catch(function (err) {
                            console.log("Error when get image list");
                        })
                        
                    // Translate data

                    await api.getArtifactsEnglish(
                        artifact["organization_path_name"],
                        artifact["organization_item_key"])
                        .then(async function (artifact_en) {
                            console.log("(English) Update artifact: " + artifact["organization_item_key"]);
                            await translate_feature.translateArtifactToEnglish(artifact_en, artifact).then(async function(res){
                                artifact_en = res;
                            })
                                .catch(function (err) {
                                    console.log("Translate fail");
                                });
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            await connect_to_db.setArtifactsEnglish(artifact_en);

                        })
                        .catch(function (err) {
                            console.log("No english data for artifact " + artifact["organization_item_key"]);
                        })

                    // await connect_to_db.setArtifacts(artifact);
                    // await new Promise(resolve => setTimeout(resolve, 5000));
                    // for (var i = 0; i < artifact["image_files"].length; i++) {
                    //     await api.getArtifactsImage(artifact["organization_item_key"], artifact["image_files"][i])
                    //         .then(async function (res) {
                    //             await connect_to_db.setImage(artifact["organization_item_key"],artifact["image_files"][i]);

                    //         })
                    //         .catch(function (err) {
                    //             console.log("Error when get artifact image");
                    //         })
                    // }
                });

            });
        }
    }
}
