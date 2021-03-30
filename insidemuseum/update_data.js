// Get API list
const api = require('./module/update_data/getArtifactData');
const connect_to_db = require('./module/update_data/addDataToDB');
const handle = require('./module/update_data/handleData');

const admin = require('./db.js');
module.exports = {
    updateData: async function () {
        for (var id = 1; id < 5; id++) {
            await api.getArtifactsList(id).then(async function (res) {
                res.forEach(async function (artifact) {
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
                        .catch(function(err){
                            console.log("Error when get image list");
                        })
                    // await connect_to_db.setArtifacts(artifact);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    for (var i = 0; i < artifact["image_files"].length; i++) {
                        await api.getArtifactsImage(artifact["organization_item_key"],artifact["image_files"][i])
                            .then(async function (res) {
                                // connect_to_db.setImage(artifact["image_files"][i])
                            })
                            .catch(function(err) {
                                console.log("Error when get arrtifact image");
                            })
                    }
                });
                console.log("Update done with id: " + id);
            });

        }
    }
}
