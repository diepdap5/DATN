const databaseRepo = require('../../repositories/db.js');
module.exports = {
    setModelHistory: async function (museum_name){

        var model_history = {
            "museum_name" : museum_name,
            "modified_at" : new Date()
        }
        await databaseRepo.updateHistoryModel(model_history);
    },
    getHistoryModel: async function(){
        var update_history = databaseRepo.getHistoryModel();
        return update_history;
    }

}