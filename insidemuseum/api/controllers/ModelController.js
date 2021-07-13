'use strict'
const modelManager = require("../../module/modelManagement/modelManager.js");

module.exports = {
    updateTrainingImage: function (req, res) {
        let museum_name = req.params.museum_name;
        console.log('Updating training data of: ' + museum_name)
        var result = modelManager.updateTrainingImage(museum_name);
        res.send(result);
        
    },
    updateModel: function (req, res) {
        let museum_name = req.params.museum_name;
        let epoch = req.params.epoch;
        console.log('Updating model of: ' + museum_name)
        modelManager.updateModelHistory(museum_name);
        var result = modelManager.updateModel(museum_name, epoch)
        res.send(result);
        
    },
    getUpdateHistory: async function (req, res){
        var update_history = await modelManager.getHistoryModel();
        res.json(update_history);
    },
    getModel: async function (req,res) {
        var model_link = await modelManager.getModel();
        res.json({"model_links" : model_link});
    }
}