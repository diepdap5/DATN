'use strict'
const fs = require('fs')
const fsExtra = require('fs-extra')

module.exports = {
    saveImage: function (image_stream,image_url) {
        var image_file_path = image_url.split("/")[4];
        var image_name = image_url.split("/")[7];
        image_stream.data.pipe(fs.createWriteStream(
            'image/' +
            image_file_path + '/' +
            image_name));
    },
    deleteImage: function (){
        fsExtra.emptyDirSync('image/kyohaku/')
        fsExtra.emptyDirSync('image/kyuhaku/')
        fsExtra.emptyDirSync('image/narahaku/')
        fsExtra.emptyDirSync('image/tnm/')
    }
}