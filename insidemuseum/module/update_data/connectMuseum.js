'use strict'
const axios = require('axios');
const fs = require('fs');
const handle = require('./handleData.js');
module.exports = {
    getArtifactsList: async function (organization_id) {
        var artifacts_arr = new Array();
        for (let number_of_page = 1; number_of_page < 2; number_of_page++) {
            await axios({
                method: 'get',
                url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items?locale=ja&page="
                    + number_of_page
                    + "&limit=20&with_image_file=1&only_parent=0&organization_id="
                    + organization_id,
                headers: { 'x-api-key': 'aaa' }
            })
                .then(function (response) {
                    response.data.results.forEach(function (artifact) {
                        // Chi lay artifact co description
                        if (artifact["descriptions"].length > 0) {
                            artifacts_arr.push(artifact);
                        }
                    });
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
        if (organization_path_name == 'kyohaku') {
            organization_item_key = organization_item_key.replace('甲', '%E7%94%B2')
            organization_item_key = organization_item_key.replace('乙', '%E4%B9%99')
            await axios({
                method: 'get',
                url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items/" +
                    organization_path_name +
                    "/" + organization_item_key + "?locale=ja",
                headers: { 'x-api-key': 'aaa' },
            })
                .then(function (response) {
                    response.data.image_files.forEach(function (image) {
                        artifacts_image_arr.push(image["url"]);
                    });

                })
                .catch(function (error) {
                    // handle error
                    console.log('Error when taking image list of: ' +
                        organization_path_name + '/' + organization_item_key);
                })
        }
        else {
            await axios({
                method: 'get',
                url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items/"
                    + organization_path_name
                    + "/" + organization_item_key
                    + "?locale=ja",
                headers: { 'x-api-key': 'aaa' },
            })
                .then(function (response) {
                    response.data.image_files.forEach(function (image) {
                        artifacts_image_arr.push(image["url"]);
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log('Error when taking image list of: ' +
                        organization_path_name + '/' + organization_item_key);
                })
        }
        return artifacts_image_arr;
    },
    getArtifactsImage: async function (organization_item_key,image_url) {
        await axios({
            method: 'get',
            url: image_url,
            headers: { 'x-api-key': 'aaa' },
            responseType: 'stream',
        })
            .then(async function (response) {
                // await handle.saveImage(response, organization_item_key,image_url);
            })
            .catch(function (error) {
                // handle error
                console.log('Error when taking image: ' + image_url);
                console.log(error);
            })
    }
};