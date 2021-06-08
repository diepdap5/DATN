const databaseRepo = require('./../../repositories/db.js');
module.exports = {
    setUpdateHistory: function (museum_id) {
        let museum_name;
        if (museum_id == 1) {
            museum_name = 'tnm';
        } else if (museum_id == 2) {
            museum_name = 'kyohaku';
        } else if (museum_id == 3) {
            museum_name = 'narahaku';
        } else {
            museum_name = 'kyuhaku';
        }
        var history = {
            "museum_name": museum_name,
            "modified_at": new Date(),
        }
        databaseRepo.updateHistoryData(history);
    },
    getUpdateHistory: async function (){
        var history = await databaseRepo.getHistoryData();
        return history;
    }
}