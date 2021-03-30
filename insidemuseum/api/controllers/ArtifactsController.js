'use strict'

const util = require('util')
const mysql = require('mysql')
const admin = require('../../db')
const db = admin.firestore();
const { response } = require('express')


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
    get_by_id :(req, res) => {
        let museum_name = req.params.museum_name;
        let artifact_id = req.params.artifact_id;
        let doc_name = museum_name + '_' + artifact_id;
        db.collection("ethnology").doc(doc_name).get().then((querySnapshot) => {
            console.log(querySnapshot)
            res.json(querySnapshot.data());
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        // res.json({data: data, artifact_id: artifact_id});
    }
}
