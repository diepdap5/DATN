'use strict'
const path = require('path');
const util = require('util')
const mysql = require('mysql')
const admin = require('../../db')
const db = admin.firestore();
var bucket = admin.storage().bucket();
const { response } = require('express')
const connect_db = require('../../module/update_data/connectDatabase')

async function getURL(museum_name,artifact_id,image_links)  {
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
    get_data_by_id: async function (req, res) {
        let museum_name = req.params.museum_name;
        let artifact_id = req.params.artifact_id;
        let doc_name = museum_name + '_' + artifact_id;
        var locale = req.params.locale;
        var artifact;
        if (locale == 'ja') {
            db.collection("ethnology").doc(doc_name).get().then(async (querySnapshot) => {
                artifact = querySnapshot.data();
                var image_list = artifact["image_files"];
                artifact["image_files"] = [];
                await image_list.forEach(async function (image_links) {
                    await getURL(museum_name, artifact_id, image_links).then(async (res) =>{
                        artifact["image_files"].push(res);
                    });
                    console.log(artifact["image_files"]);
                });
                await new Promise(resolve => setTimeout(resolve, 5000));
                console.log(artifact);
                await res.json(artifact);
            })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
        else {
            var image_files;
            await db.collection("ethnology").doc(doc_name).get().then(async (querySnapshot) => {
                artifact = querySnapshot.data();
                var image_list = artifact["image_files"];
                artifact["image_files"] = [];
                await image_list.forEach(async function (image_links) {
                    await getURL(museum_name, artifact_id, image_links).then(async (res) =>{
                        artifact["image_files"].push(res);
                    });
                    console.log(artifact["image_files"]);
                });
                await new Promise(resolve => setTimeout(resolve, 5000));
                image_files = await artifact["image_files"];
            })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            await db.collection("museum_en").doc(doc_name).get().then(async (querySnapshot) => {
                artifact = querySnapshot.data();
                artifact["image_files"] = image_files;
                await new Promise(resolve => setTimeout(resolve, 5000));
                console.log(artifact);
                await res.json(artifact);
            })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            
        }


    },
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


    }
}
