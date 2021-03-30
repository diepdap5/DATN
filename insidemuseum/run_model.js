var express = require('express');
var app = express();
function callName(req, res) {
    var spawn = require("child_process").spawn;
    var process = spawn('python3',["model.py"] );
    process.stdout.on('data', function(data) {
        // res.send(data.toString());
    } )
}
callName();
    

  