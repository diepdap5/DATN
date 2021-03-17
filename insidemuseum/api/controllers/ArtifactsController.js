'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
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


    }
}
