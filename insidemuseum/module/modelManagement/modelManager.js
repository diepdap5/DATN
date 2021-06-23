
const { spawn } = require('child_process');
const modelHistory = require('./modelHistory.js')
const storageRepo = require('../../repositories/storage.js');

module.exports = {
    updateTrainingImage: function (museum_name) {
        const python = spawn('python3',
            ['/home/diepdn/DATN/recognition/create_training_data.py',
                museum_name],
        );
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`Update training image successfully!`);
            // send data to browser
            return "Update training image successfully!";
        });
    },
    updateModel: function (museum_name, epoch) {
        const python = spawn('python3',
            ['/home/diepdn/DATN/recognition/model_v2.py',
                museum_name,
                epoch
            ],
        );
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`Update training image successfully!`);
            // send data to browser
            return `Update model successfully!`;
        });
    },
    updateModelHistory: async function (museum_name) {
        await modelHistory.setModelHistory(museum_name);
    },
    getHistoryModel: async function () {
        var update_history = await modelHistory.getHistoryModel();
        return update_history;
    },
    getModel: async function () {
        var result = await storageRepo.getModelURL();
        return result;
    }

}