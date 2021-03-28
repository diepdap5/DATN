
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');//initialize admin SDK using serciceAcountKey
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
storageBucket: "insidemuseum-30c0a.appspot.com"
});
module.exports = admin;
