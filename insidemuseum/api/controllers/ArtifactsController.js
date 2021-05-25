'use strict'
const path = require('path');
const util = require('util')
const mysql = require('mysql')
const admin = require('../../db')
const db = admin.firestore();
var bucket = admin.storage().bucket();
const { response } = require('express')
const connect_db = require('../../module/update_data/connectDatabase')
var fs = require('fs');

// MongoDB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

async function getURL(museum_name, artifact_id, image_links) {
    var image_name = image_links.split('/').pop();
    var starsRef = bucket.file(museum_name + '/' + artifact_id + '/' + image_name);
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
};
function transferImageToBase64(museum_name, artifact_id, image_links) {
    var image_name = image_links.split('/').pop();
    var url = '/home/diepdn/DATN/insidemuseum/image/' + museum_name + '/' + artifact_id + '/' + image_name
    var imageAsBase64 = fs.readFileSync(url, 'base64');
    return imageAsBase64;
};



module.exports = {
    get: (req, res) => {
        var myList = new Array();
        db.collection("ethnology").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                myList.push(doc.data());
            });
            res.json(myList);
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    },
    // get_data_by_id: async function (req, res) {
    //     let museum_name = req.params.museum_name;
    //     let artifact_id = req.params.artifact_id;
    //     let doc_name = museum_name + '_' + artifact_id;
    //     var locale = req.params.locale;
    //     var artifact;
    //     if (locale == 'ja') {
    //         db.collection("ethnology").doc(doc_name).get().then(async (querySnapshot) => {
    //             artifact = querySnapshot.data();
    //             var image_list = artifact["image_files"];
    //             artifact["image_files"] = [];
    //             await image_list.forEach(async function (image_links) {
    //                 await getURL(museum_name, artifact_id, image_links).then(async (res) => {
    //                     artifact["image_files"].push(res);
    //                 });
    //                 console.log(artifact["image_files"]);
    //             });
    //             await new Promise(resolve => setTimeout(resolve, 5000));
    //             console.log(artifact);
    //             await res.json(artifact);
    //         })
    //             .catch((error) => {
    //                 console.log("Error getting documents: ", error);
    //             });
    //     }
    //     else {
    //         var image_files;
    //         await db.collection("ethnology").doc(doc_name).get().then(async (querySnapshot) => {
    //             artifact = querySnapshot.data();
    //             var image_list = artifact["image_files"];
    //             artifact["image_files"] = [];
    //             await image_list.forEach(async function (image_links) {
    //                 await getURL(museum_name, artifact_id, image_links).then(async (res) => {
    //                     artifact["image_files"].push(res);
    //                 });
    //                 console.log(artifact["image_files"]);
    //             });
    //             await new Promise(resolve => setTimeout(resolve, 5000));
    //             image_files = await artifact["image_files"];
    //         })
    //             .catch((error) => {
    //                 console.log("Error getting documents: ", error);
    //             });
    //         await db.collection("museum_en").doc(doc_name).get().then(async (querySnapshot) => {
    //             artifact = querySnapshot.data();
    //             artifact["image_files"] = image_files;
    //             await new Promise(resolve => setTimeout(resolve, 5000));
    //             console.log(artifact);
    //             await res.json(artifact);
    //         })
    //             .catch((error) => {
    //                 console.log("Error getting documents: ", error);
    //             });

    //     }


    // },
    get_image_by_id: async function (req, res) {
        let museum_name = req.params.museum_name;
        let artifact_id = req.params.artifact_id;
        let image_name = req.params.image_name;
        var starsRef = bucket.file(museum_name + '/' + artifact_id + '/' + image_name);
        starsRef.getSignedUrl({
            version: "v4",
            action: "read",
        })
            .then((url) => {
                res.json({ "image_network_url": url })
            })
    },
    get_all_artifacts: async function (req, res) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                let museum_name = req.params.museum_name;
                let locale = req.params.locale;
                // Find all 
                const cursor = dbo.collection(museum_name + '_' + locale).find({});
                const artifacts = await cursor.toArray();
                console.log(artifacts);
                res.json(artifacts);
                await client.close();
            }
        });
    },
    get_artifact_by_id: async function (req, res) {
        let artifact_id = req.params.artifact_id;
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                let museum_name = req.params.museum_name;
                let locale = req.params.locale;
                // Find all 
                const cursor = dbo.collection(museum_name + '_' + locale).findOne({ organization_item_key: artifact_id });
                const artifact = await cursor;
                var newImageList = new Array();
                artifact["image_files"].forEach(image_links => {
                    var image_base64 = transferImageToBase64(museum_name, artifact_id, image_links);
                    newImageList.push(image_base64)
                })
                artifact["image_files"] = newImageList;
                console.log("Get data for artifact: " + artifact_id);
                res.json(artifact);
                await client.close();
            }
        });
    },
    get_all_artifacts_test3: async function (req, res) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                let museum_name = req.params.museum_name;
                let locale = req.params.locale;
                let skip_value = parseInt(req.params.page) - 1;
                // Find all 
                const cursor = dbo.collection(museum_name + '_' + locale).find({}).skip(20 * skip_value).limit(20);
                const artifacts = await cursor.toArray();
                artifacts.forEach(artifact => {
                    var image_base64 = transferImageToBase64(museum_name, artifact["organization_item_key"], artifact["image_files"][0])
                    artifact["image_files"] = image_base64;
                })
                console.log("Get " + artifacts.length.toString() + " artifacts from page " + req.params.page);
                res.json(artifacts);
                await client.close();
            }
        });
    },
    search: async function (req, res) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                let museum_name = req.params.museum_name;
                let locale = req.params.locale;
                let search_keyword = req.params.search_keyword;
                // Search
                const cursor = dbo.collection(museum_name + '_' + locale).find({'title': {'$regex': search_keyword}});
                const artifacts = await cursor.toArray();
                artifacts.forEach(artifact => {
                    var image_base64 = transferImageToBase64(museum_name, artifact["organization_item_key"], artifact["image_files"][0])
                    artifact["image_files"] = image_base64;   
                })  
                console.log("Search results: " + artifacts.length.toString());
                res.json(artifacts);
                await client.close();
            }
        });
    }
}
