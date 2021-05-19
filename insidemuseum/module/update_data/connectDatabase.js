'use strict'
const { File } = require('@google-cloud/storage');
const admin = require('../../db')
const db = admin.firestore()
var bucket = admin.storage().bucket();
const uuidv4 = require('uuid/v4');
const uuid = uuidv4();

module.exports = {
    setArtifacts: function (artifact) {
        var artifact_id = artifact["organization_path_name"] + "_" + artifact["organization_item_key"];
        db.collection('ethnology').doc(artifact_id).set(artifact);
    },
    setArtifactsEnglish: function (artifact) {
        var artifact_id = artifact["organization_path_name"] + "_" + artifact["organization_item_key"];
        db.collection('museum_en').doc(artifact_id).set(artifact);
    },
    setImage: async function (organization_item_key, image_url) {
        var image_file_path = image_url.split("/")[4];
        var image_name = image_url.split("/")[7];
        await bucket.upload('image/'
            + image_file_path
            + '/' + organization_item_key
            + '/' + image_name, {
            destination: image_file_path + '/' + organization_item_key
                + '/' + image_name,
            resumable: true,
            uploadType: '',
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: uuidv4(),
                },
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000',
            },
        }).then((res) => {
            console.log('Upload files ' + image_file_path + '/' + organization_item_key
                + '/' + image_name)
        })
            .catch(function (err) {
                console.log('Cannot upload ' + image_url + 'to Cloud Firestore')
                console.log(err);
            });
    },
    getImage: async function (organization_path_name, organization_item_key, image_url) {
        const options = {
            destination: 'api/controllers/tmp_image/tmp.jpg',
        };
        await bucket.file(organization_path_name
            + '/' + organization_item_key
            + '/' + image_url).download(options);
        console.log('Downloaded ' + organization_path_name
            + '/' + organization_item_key
            + '/' + image_url)
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

}