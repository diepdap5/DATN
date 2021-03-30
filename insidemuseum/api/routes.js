'use strict';
module.exports = function (app) {
    let artifactsCtrl = require('./controllers/ArtifactsController');

    // todoList Routes
    app.route('/artifacts')
        .get(artifactsCtrl.get);
    app.route('/:museum_name/:artifact_id')
        .post(artifactsCtrl.get_by_id);

};