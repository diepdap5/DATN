'use strict'
const admin = require('../../db')
const db = admin.firestore()
var bucket = admin.storage().bucket();

module.exports = {
    setArtifacts: function (artifact) {
        var artifact_id = artifact["organization_path_name"] + "_" + artifact["organization_item_key"];
        db.collection('ethnology').doc(artifact_id).set(artifact);
    },
    setImage: function (image_url) {
        var image_file_path = image_url.split("/")[4];
        var image_name = image_url.split("/")[7];
        bucket.upload('image/' + image_file_path + '/' + image_name, {
            destination: image_file_path + '/' + image_name,
        }).then((res) => {
           // Do nothing 
        })
        .catch(function(err){
            console.log('Cannot upload ' + image_url + 'to Cloud Firestore' )
            console.log(err);
        });
    }
}