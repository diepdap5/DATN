'use strict'
const db = require('../../db')

module.exports = {
    addArtifacts: function(artifact){
        var artifact_id = artifact["organization_path_name"] + "_" + artifact["organization_item_key"];
        db.collection('ethnology').doc(artifact_id).set(artifact);
    }
}