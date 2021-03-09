'use strict';
module.exports = function(app){
    let artifactsCtrl = require('./controllers/ArtifactsController');

    // todoList Routes
    app.route('/artifacts')
        .get(artifactsCtrl.get)
};