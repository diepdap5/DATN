'use strict'
const artifactManager = require("../../module/artifactManagement/artifactManager.js");

module.exports = {
    get_all_artifacts: async function (req, res) {
        let locale = req.params.locale;
        var artifacts = await artifactManager.getAllArtifact(locale);
        res.json(artifacts);
    },
    get_artifact_by_id: async function (req, res) {
        let artifact_id = req.params.artifact_id;
        let museum_name = req.params.museum_name;
        let locale = req.params.locale;
        var artifact = await artifactManager.getArtifactById(artifact_id, museum_name, locale);
        res.json(artifact);
    },
    get_all_artifacts_pagination: async function (req, res) {
        let museum_name = req.params.museum_name;
        let locale = req.params.locale;
        let skip_value = parseInt(req.params.page) - 1;
        var artifacts = await artifactManager.getAllArtifactPagination(museum_name, locale, skip_value)
        res.json(artifacts);
    },
    search: async function (req, res) {
        let museum_name = req.params.museum_name;
        let locale = req.params.locale;
        let search_keyword = req.params.search_keyword;
        var artifacts = await artifactManager.searchArtifact(museum_name, locale, search_keyword);
        res.json(artifacts);
    },
    update_museum_data: async function (req, res) {
        let id_museum;
        if (req.params.museum == 'tnm') {
            id_museum = 1;
        } else if (req.params.museum == 'kyohaku') {
            id_museum = 2;
        } else if (req.params.museum == 'narahaku') {
            id_museum = 3;
        } else {
            id_museum = 4;
        }
        await artifactManager.updateData(id_museum).then((result) => {
            res.json({ "result": "Done" });
        })
    },
    getUpdateHistory: async function (req, res) {
        var update_history = await artifactManager.getHistory();
        res.json(update_history);
    },
    getIdByTitle: async function (req, res) {
        let museum_name = req.params.museum_name;
        let artifact_title = req.params.artifact_title;
        var id = await artifactManager.getArtifactIdByTitle(museum_name, artifact_title);
        res.json({ "id": id });
    }
}
