'use strict';
module.exports = function (app) {
    let artifactsCtrl = require('./controllers/ArtifactsController');

    // todoList Routes
    app.route('/artifacts')
        .get(artifactsCtrl.get);
    app.route('/:museum_name/:locale/:artifact_id')
        .get(artifactsCtrl.get_data_by_id);
    // app.route('/:museum_name/:artifact_id/:image_name')
    //     .get(artifactsCtrl.get_image_by_id);

};
