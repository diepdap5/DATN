const handleData = require("./module/update_data/handleData");
const update_data = require("./update_data");
const api = require('./module/update_data/connectMuseum');
const connect_to_db = require('./module/update_data/connectDatabase');

update_data.updateData().then((res) => {
    console.log("Finish update");
})

