'use strict'
var fs = require('fs');
const update_data = require("../../module/update_data/update_data");

// MongoDB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

function transferImageToBase64(museum_name, artifact_id, image_links) {
    var image_name = image_links.split('/').pop();
    var url = '/home/diepdn/DATN/image/' + museum_name + '/' + artifact_id + '/' + image_name
    var imageAsBase64 = fs.readFileSync(url, 'base64');
    return imageAsBase64;
};

module.exports = {
    get_all_artifacts: async function (req, res) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                let locale = req.params.locale;
                // Find all 
                const cursor = dbo.collection('tnm_' + locale).find({});
                const artifacts_tnm = await cursor.toArray();

                const cursor1 = dbo.collection('kyohaku_' + locale).find({});
                const artifacts_kyohaku = await cursor1.toArray();

                const cursor2 = dbo.collection('narahaku_' + locale).find({});
                const artifacts_narahaku = await cursor2.toArray();

                const cursor3 = dbo.collection('kyuhaku_' + locale).find({});
                const artifacts_kyuhaku = await cursor3.toArray();

                var artifacts = artifacts_tnm.concat(artifacts_kyohaku, artifacts_narahaku, artifacts_kyuhaku)
                artifacts = artifacts.sort(() => Math.random() - 0.5);
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
                console.log("Get data for artifact: " + artifact_id);
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

                var relevant_artifact = [];
                // Find relevant
                if (artifact["bunrui"] != null) {
                    const cursor1 = dbo.collection(museum_name + '_' + locale)
                        .find({
                            'bunrui': artifact["bunrui"],
                            'organization_item_key': { '$not': { '$regex' : artifact["organization_item_key"] } }
                        }).limit(5);
                    var tmp = await cursor1.toArray();
                    relevant_artifact = relevant_artifact.concat(tmp)
                }
                if (relevant_artifact.length < 5) {
                    if (artifact["bunkazai"] != null) {
                        const cursor2 = dbo.collection(museum_name + '_' + locale)
                            .find({
                                'bunrui': artifact["bunrui"],
                                'organization_item_key': { '$not': { '$regex' : artifact["organization_item_key"] } }
                            })
                            .limit(5 - relevant_artifact.length);
                        var tmp2 = await cursor2.toArray();
                        relevant_artifact = relevant_artifact.concat(tmp2)
                    }
                }
                if (relevant_artifact.length < 5) {
                    const cursor3 = dbo.collection(museum_name + '_' + locale)
                        .find({
                            'organization_path_name': artifact["organization_path_name"],
                            'organization_item_key': { '$not': { '$regex' : artifact["organization_item_key"] } }
                        })
                        .limit(5 - relevant_artifact.length);
                    var tmp3 = await cursor3.toArray();
                    relevant_artifact = relevant_artifact.concat(tmp3)
                }
                // Convert relevent_artifact
                var result = [];
                for (var i = 0; i < relevant_artifact.length; i++) {
                    result.push({
                        "organization_item_key": relevant_artifact[i]["organization_item_key"],
                        "image_demo": transferImageToBase64(
                            museum_name,
                            relevant_artifact[i]["organization_item_key"],
                            relevant_artifact[i]["image_files"][0]
                        )
                    })
                }
                artifact["relevant"] = result
                res.json(artifact);
                await client.close();
            }
        });
    },
    get_all_artifacts_pagination: async function (req, res) {
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
                const cursor = dbo.collection(museum_name + '_' + locale).find({ 'title': { '$regex': search_keyword } });
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
    },
    update_museum_data: async function (req, res) {
        let id_museum;
        if (req.params.museum == 'tnm') {
            id_museum = 1;
        } else if (req.params.museum == 'kyohaku') {
            id_museum = 2;
        } else if (req.params.museum == 'narahaku') {
            id_museum = 3;
        } else {
            id_museum = 4;
        }
        await update_data.updateData(id_museum).then((result) => {
            res.json({ "result": "Done" });
        })
    },
    getUpdateHistory: async function (req, res) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                // Find all history
                const history_tnm = await dbo.collection('update_history').findOne(
                    { museum_name: "tnm" },
                    { sort: { modified_at: -1 } },
                );
                const history_kyohaku = await dbo.collection('update_history').findOne(
                    { museum_name: "kyohaku" },
                    { sort: { modified_at: -1 } },
                );
                const history_narahaku = await dbo.collection('update_history').findOne(
                    { museum_name: "narahaku" },
                    { sort: { modified_at: -1 } },
                );
                const history_kyuhaku = await dbo.collection('update_history').findOne(
                    { museum_name: "kyuhaku" },
                    { sort: { modified_at: -1 } },
                );
                var history = [history_tnm, history_kyohaku, history_narahaku, history_kyuhaku];
                var count_tnm = await dbo.collection('tnm_ja').countDocuments({});
                var count_kyohaku = await dbo.collection('kyohaku_ja').countDocuments({});
                var count_narahaku = await dbo.collection('narahaku_ja').countDocuments({});
                var count_kyuhaku = await dbo.collection('kyuhaku_ja').countDocuments({});
                var count = {
                    "tnm": count_tnm,
                    "kyohaku": count_kyohaku,
                    "narahaku": count_narahaku,
                    "kyuhaku": count_kyuhaku
                }
                var update_history = {
                    "history": history,
                    "count": count
                }
                res.json(update_history);
                await client.close();
            }
        });
    },
    getIdByTitle: async function(req,res) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection

                var dbo = client.db("museum");
                let museum_name = req.params.museum_name;
                let artifact_title = req.params.artifact_title;
                
                // Search
                const cursor = dbo.collection(museum_name + '_ja').findOne({ 'title': artifact_title });
                const artifact = await cursor;
                console.log("Finding id for title: " + artifact_title + ' --> ' + artifact["organization_item_key"]);
                res.json({"id" : artifact["organization_item_key"]});
                await client.close();
            }
        });
    }
}
