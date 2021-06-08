const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv')
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());
app.options('*', cors());
console.log('RESTful API server started on: ' + port);
let routes = require('./api/routes') 
//importing route
routes(app)

app.listen(port);


