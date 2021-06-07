'use strict';
module.exports = function (app) {
    let artifactsCtrl = require('./controllers/ArtifactsController');
    let modelCtrl = require('./controllers/ModelController');

    // todoList Routes

    app.route('/getById/:museum_name/:locale/:artifact_id')
        .get(artifactsCtrl.get_artifact_by_id);
    app.route('/getAll/:locale')
        .get(artifactsCtrl.get_all_artifacts);
    app.route('/getAllPagination/:museum_name/:locale/page/:page')
        .get(artifactsCtrl.get_all_artifacts_pagination);
    app.route('/search/:museum_name/:locale/:search_keyword')
        .get(artifactsCtrl.search);
    app.route('/update/:museum')
        .put(artifactsCtrl.update_museum_data);
    app.route('/history_artifact')
        .get(artifactsCtrl.getUpdateHistory);
    app.route('/update_model/image/:museum_name')
        .put(modelCtrl.updateTrainingImage);
    app.route('/update_model/model/:museum_name/:epoch')
        .put(modelCtrl.updateModel);
    app.route('/history_model')
        .get(modelCtrl.getUpdateHistory);
    app.route('/getIdByTitle/:museum_name/:artifact_title')
        .get(artifactsCtrl.getIdByTitle);
};
