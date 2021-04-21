'use strict'
const path = require('path');
const util = require('util')
const mysql = require('mysql')
const admin = require('../../db')
const db = admin.firestore();
const { response } = require('express')
const connect_db = require('../../module/update_data/connectDatabase')

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
    get_data_by_id: async function(req, res) {
        let museum_name = req.params.museum_name;
        let artifact_id = req.params.artifact_id;
        let doc_name = museum_name + '_' + artifact_id;
         db.collection("ethnology").doc(doc_name).get().then((querySnapshot) => {
            console.log(querySnapshot.data())
            res.json(querySnapshot.data());
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        
    },
    get_image_by_id: async function(req, res){
        let museum_name = req.params.museum_name;
        let artifact_id = req.params.artifact_id;
        let image_name = req.params.image_name;
        await connect_db.getImage(museum_name, artifact_id, image_name);
        res.sendFile(path.join(__dirname + '/tmp_image/tmp.jpg'));
    }
}
