'use strict'

// MongoDB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = {    
    setArtifactsMongoDB: function (museum_name, locale, artifact) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                // Remove exist data in collections
                const cursor = dbo.collection(museum_name + '_' + locale).findOne({ organization_item_key: artifact["organization_item_key"] });
                const finding = await cursor;

                var update_log = await dbo.collection('update_history').findOne(
                    {},
                    { sort: { modified_at: -1 } },
                  );
                
                if (finding != null) {
                    // Remove exist
                    dbo.collection(museum_name + '_' + locale).deleteOne({ organization_item_key: artifact["organization_item_key"] })
                    // Save history
                    update_log["changes"].push({
                        "action" : "update",
                        "item_key" : artifact["organization_item_key"],
                        "locale": locale
                    })
                    await dbo.collection('update_history').updateOne(
                        { modified_at: update_log["modified_at"] }, 
                        {
                            $set: {
                              changes: update_log["changes"],
                            },
                          }, 
                        );
                }
                else{
                    update_log["changes"].push({
                        "action" : "insert",
                        "item_key" : artifact["organization_item_key"],
                        "locale": locale
                    })
                    await dbo.collection('update_history').updateOne(
                        { modified_at: update_log["modified_at"] }, 
                        {
                            $set: {
                              changes: update_log["changes"],
                            },
                          }, 
                        );
                }
                // Insert all data in collections
                dbo.collection(museum_name + '_' + locale).insertOne(artifact, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Updated ' + museum_name + '_' + locale + '/' + artifact["organization_item_key"]);
                    }
                    client.close();
                });
            }
        });
    },
    setUpdateHistoryMongoDB: function (museum_id) {
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                let museum_name;
                if (museum_id == 1) {
                    museum_name = 'tnm' ;
                } else if (museum_id == 2) {
                    museum_name = 'kyohaku';
                } else if (museum_id == 3) {
                    museum_name = 'narahaku';
                } else {
                    museum_name = 'kyuhaku';
                }
                var history = {
                    "museum_name": museum_name,
                    "modified_at": new Date(),
                    "changes": []
                }
                // Get the documents collection
                var dbo = client.db("museum");
                // Insert all data in collections
                dbo.collection("update_history").insertOne(history, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Created update records.');
                    }
                    client.close();
                });
            }
        });
    },

}