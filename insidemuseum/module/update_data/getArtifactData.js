'use strict'
const axios = require('axios');
const fs = require('fs');
module.exports = {
    getArtifactsList: async function (word_ja) {
        var artifacts_arr = new Array();
        for (let number_of_page = 1; number_of_page < 5; number_of_page++) {
            await axios({
                method: 'get',
                url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items?locale=ja&page="
                    + number_of_page
                    + "&limit=100&with_image_file=1&only_parent=0&organization_id=1",
                headers: { 'x-api-key': 'aaa' }
            })
                .then(function (response) {
                    response.data.results.forEach(function (artifact) {
                        // Chi lay artifact co description
                        if (artifact["descriptions"].length > 0) {
                            artifacts_arr.push(artifact);
                        }
                    });
                    console.log("Done page " + number_of_page);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
        return artifacts_arr;
    },
    getArtifactsImageList: async function (organization_path_name, organization_item_key) {
        var artifacts_image_arr = new Array();
        await axios({
            method: 'get',
            url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items/"
            + organization_path_name 
            + "/" + organization_item_key
            + "?locale=ja",
            headers: { 'x-api-key': 'aaa' },
        })
            .then(function (response) {
                // var artifacts_image_arr = new Array();
                response.data.image_files.forEach(function (image) {
                    artifacts_image_arr.push(image["url"]);
                });
                // artifacts_image_obj = {
                //     organization_path_name: organization_path_name,
                //     organization_item_key: organization_item_key,
                //     image_url: artifacts_image_arr
                // }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        return artifacts_image_arr;
    },
    getArtifactsImage: async function (image_url){
        await axios({
            method: 'get',
            url: image_url,
            headers: { 'x-api-key': 'aaa' },
            responseType: 'stream',
        })
            .then(function (response) {
                var image_name = image_url.split("/").pop();
                response.data.pipe(fs.createWriteStream(image_name));
            })
            .catch(function (error) {
                // handle error
                console.log(error); 
            })
    }
};