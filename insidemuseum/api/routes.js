'use strict';
module.exports = function (app) {
    let artifactsCtrl = require('./controllers/ArtifactsController');

    // todoList Routes
    app.route('/artifacts')
        .get(artifactsCtrl.get);
    app.route('/:museum_name/:locale/:artifact_id')
        .get(artifactsCtrl.get_artifact_by_id);
    app.route('/:museum_name/:locale')
         .get(artifactsCtrl.get_all_artifacts);
    app.route('/:museum_name/:locale/page/:page')
        .get(artifactsCtrl.get_all_artifacts_test3);
    // app.route('/:museum_name/:artifact_id/:image_name')
    //     .get(artifactsCtrl.get_image_by_id);
    app.route('/:museum_name/:locale/search/:search_keyword')
        .get(artifactsCtrl.search);

};
