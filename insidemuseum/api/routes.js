'use strict';
module.exports = function (app) {
    let artifactsCtrl = require('./controllers/ArtifactsController');

    // todoList Routes
    app.route('/:museum_name/:locale/:artifact_id')
        .get(artifactsCtrl.get_artifact_by_id);
    app.route('/:museum_name/:locale')
         .get(artifactsCtrl.get_all_artifacts);
    app.route('/:museum_name/:locale/page/:page')
        .get(artifactsCtrl.get_all_artifacts_pagination);
    app.route('/:museum_name/:locale/search/:search_keyword')
        .get(artifactsCtrl.search);
    app.route('/runpython')
        .put(artifactsCtrl.run_python);
    app.route('/update/:museum')
        .put(artifactsCtrl.update_museum_data);
    app.route('/history')
        .get(artifactsCtrl.getUpdateHistory);
};
