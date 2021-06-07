'use strict'
const {spawn} = require('child_process');
// MongoDB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = {
    updateTrainingImage: function (req, res) {
        let museum_name = req.params.museum_name;
        console.log('Updating training data of: ' + museum_name)
        // spawn new child process to call the python script
        const python = spawn('python3', 
                            ['/home/diepdn/DATN/recognition/create_training_data.py',
                            museum_name],
        );
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`Update training image successfully!`);
            // send data to browser
            res.send("Update training image successfully!")
        });
    },
    updateModel: function (req, res) {
        let museum_name = req.params.museum_name;
        let epoch = req.params.epoch;
        console.log('Updating model of: ' + museum_name)
        // spawn new child process to call the python script
        const python = spawn('python3', 
                            ['/home/diepdn/DATN/recognition/model_v2.py',
                            museum_name,
                            epoch
                            ],
        );
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`Update model successfully!`);
            // send data to browser
        });
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                // Find all history
                var model_history = {
                    "museum_name" : museum_name,
                    "modified_at" : new Date()
                }
                dbo.collection("update_model_history").insertOne(model_history, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Request update model successfully!");
                    }
                    client.close();
                });
                
                await client.close();
            }
        });
    },
    getUpdateHistory: async function (req, res){
        MongoClient.connect(url, async function (err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var dbo = client.db("museum");
                // Find all history
                const history_tnm = await dbo.collection('update_model_history').findOne(
                    { museum_name: "tnm" },
                    { sort: { modified_at: -1 } },
                );
                const history_kyohaku = await dbo.collection('update_model_history').findOne(
                    { museum_name: "kyohaku" },
                    { sort: { modified_at: -1 } },
                );
                const history_narahaku = await dbo.collection('update_model_history').findOne(
                    { museum_name: "narahaku" },
                    { sort: { modified_at: -1 } },
                );
                const history_kyuhaku = await dbo.collection('update_model_history').findOne(
                    { museum_name: "kyuhaku" },
                    { sort: { modified_at: -1 } },
                );
                var update_history = [history_tnm,history_kyohaku,history_narahaku, history_kyuhaku]
                res.json(update_history);
                await client.close();
            }
        });
    }
}