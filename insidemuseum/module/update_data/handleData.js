'use strict'
const fs = require('fs')
const fsExtra = require('fs-extra')

module.exports = {
    saveImage: async function (image_stream, organization_item_key, image_url) {
        var image_file_path = image_url.split("/")[4];
        var image_name = image_url.split("/")[7];
        await fs.mkdir('image/' + image_file_path + '/' +
            organization_item_key + '/', { recursive: true }, (err) => {
                if (err) throw err;
            });
        await new Promise(resolve => setTimeout(resolve, 200));

        await image_stream.data.pipe(fs.createWriteStream(
            'image/' +
            image_file_path + '/' +
            organization_item_key + '/' +
            image_name));
    },
    deleteImage: function () {
        fsExtra.emptyDirSync('image/kyohaku/')
        fsExtra.emptyDirSync('image/kyuhaku/')
        fsExtra.emptyDirSync('image/narahaku/')
        fsExtra.emptyDirSync('image/tnm/')
    }
}