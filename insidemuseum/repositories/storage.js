'use strict'
const fs = require('fs')
const fsExtra = require('fs-extra')

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
    deleteImage: function(museum_id){
        var museum_name = '';
        if(museum_id == 1){
            museum_name = 'tnm'
        }
        else if (museum_id ==2){
            museum_name = 'kyohaku'
        }
        else if (museum_id ==2){
            museum_name = 'narahaku'
        }
        else if (museum_id ==2){
            museum_name = 'kyuhaku'
        }
        else{
            museum_name = ''
        }
        if(museum_name != ''){
            fsExtra.emptyDirSync('/home/diepdn/DATN/image/' + museum_name + '/')
        }
        
    }
}