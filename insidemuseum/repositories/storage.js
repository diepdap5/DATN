'use strict'
const fs = require('fs')
const fsExtra = require('fs-extra')


const admin = require('firebase-admin');
const serviceAccount = require('./../serviceAccountKey.json');//initialize admin SDK using serciceAcountKey
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "insidemuseum-30c0a.appspot.com"
});
var bucket = admin.storage().bucket();

module.exports = {
    saveImage: async function (image_stream, organization_item_key, image_url) {
        var image_file_path = image_url.split("/")[4];
        var image_name = image_url.split("/")[7];
        fs.mkdir('/home/diepdn/DATN/image/' + image_file_path + '/' +
            organization_item_key + '/', { recursive: true }, (err) => {
                if (err) throw err;
            });
        await new Promise(resolve => setTimeout(resolve, 200));

        await image_stream.data.pipe(fs.createWriteStream(
            '/home/diepdn/DATN/image/' +
            image_file_path + '/' +
            organization_item_key + '/' +
            image_name));
        console.log("Saved image for " + image_file_path + '/' + organization_item_key)
    },
    deleteImage: function (museum_id) {
        var museum_name = '';
        if (museum_id == 1) {
            museum_name = 'tnm'
        }
        else if (museum_id == 2) {
            museum_name = 'kyohaku'
        }
        else if (museum_id == 3) {
            museum_name = 'narahaku'
        }
        else if (museum_id == 4) {
            museum_name = 'kyuhaku'
        }
        else {
            museum_name = ''
        }
        if (museum_name != '') {
            fsExtra.emptyDirSync('/home/diepdn/DATN/image/' + museum_name + '/')
        }

    },
    getModelURL: async function () {
        var starsRef = bucket.file('label.txt');
        var result;
        await starsRef.getSignedUrl({
            version: "v4",
            action: "read",
            expires: new Date(Date.now() + 5 * 60000),
        })
            .then((url) => {
                result = url;
            })
            .catch((err) => {
                console.log(err);
            });
        return result[0];
    }

}