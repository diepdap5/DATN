'use strict'
const axios = require('axios');
const storageRepo = require('./../../repositories/storage.js');

module.exports = {
    getArtifactsList: async function (organization_id) {
        var artifacts_arr = new Array();
        for (let number_of_page = 1; number_of_page < 2; number_of_page++) {
            await axios({
                method: 'get',
                url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items?locale=ja&page="
                    + number_of_page
                    + "&limit=100&with_image_file=1&only_parent=0&organization_id="
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
    getArtifactsEnglish: async function (organization_path_name, organization_item_key) {
        var artifact;
        if (organization_path_name == 'kyohaku') {
            organization_item_key = organization_item_key.replace('甲', '%E7%94%B2')
            organization_item_key = organization_item_key.replace('乙', '%E4%B9%99')
            await axios({
                method: 'get',
                url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items/" +
                    organization_path_name +
                    "/" + organization_item_key + "?locale=en",
                headers: { 'x-api-key': 'aaa' },
            })
                .then(function (response) {
                    artifact = response.data;
                })
                .catch(function (error) {
                    artifact = null;
                })
        }
        else {
            await axios({
                method: 'get',
                url: "https://colbase.nich.go.jp/colbaseapi/v2/collection_items/"
                    + organization_path_name
                    + "/" + organization_item_key
                    + "?locale=en",
                headers: { 'x-api-key': 'aaa' },
            })
                .then(function (response) {
                    artifact = response.data;
                })
                .catch(function (error) {
                    artifact = null;
                })
        }
        return artifact;
    },
    getImage: async function (organization_item_key,image_url) {
        var response = await axios({
            method: 'get',
            url: image_url,
            headers: { 'x-api-key': 'aaa' },
            responseType: 'stream',
        })
            .then( function (response) {
                // console.log(response)
                // await storageRepo.saveImage(response, organization_item_key, image_url);
                return response;
            })
            .catch(function (error) {
                console.log("Got error")
                console.log(error)
            });
        return response;
        // await axios({
        //     method: 'get',
        //     url: image_url,
        //     headers: { 'x-api-key': 'aaa' },
        //     responseType: 'stream',
        // })
        //     .then( function (response) {
        //         // await storageRepo.saveImage(response, organization_item_key, image_url);
        //         // console.log(response)
        //         return response;
        //     })
        //     .catch(function (error) {
        //         console.log("Got error")
        //         console.log(error)
        //     });
        // await axios({
        //     method: 'get',
        //     url: image_url,
        //     headers: { 'x-api-key': 'aaa' },
        //     responseType: 'stream',
        // })
        //     .then( function (response) {
        //         // await storageRepo.saveImage(response, organization_item_key, image_url);
        //         // console.log(response)

        //         return response;
        //     })
        //     .catch(function (error) {
        //         console.log("Got error")
        //         console.log(error)
        //     });
    }
};
