
// MongoDB
var mongodb = require('mongodb');
var url = "mongodb://localhost:27017/";
var MongoClient = mongodb.MongoClient;
var DB_NAME = "museum"

module.exports = {
    saveAllNewData: async function (col, artifact) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }

        // Get the documents collection
        var dbo = client.db(DB_NAME);
        // Insert all data in collections
        dbo.collection(col).insertOne(artifact, function (err, result) {
            if (err) {
                console.log("Error insert: " + col + '/' + artifact["organization_item_key"]);
            } else {
                console.log('Updated ' + col + '/' + artifact["organization_item_key"]);
            }

        });
    },
    deleteCollections: async function (museum_id) {
        var museum_name = '';
        if(museum_id == 1){
            museum_name = 'tnm'
        }
        else if (museum_id ==2){
            museum_name = 'kyohaku'
        }
        else if (museum_id ==3){
            museum_name = 'narahaku'
        }
        else if (museum_id ==4){
            museum_name = 'kyuhaku'
        }
        else{
            museum_name = ''
        }
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        if (museum_name != ''){
             // Get the documents collection
            var dbo = client.db(DB_NAME);
            // Remove exist data in collections
            // dbo.collection(museum_name + '_ja').deleteMany({});
            dbo.collection(museum_name + '_en').deleteMany({});
            dbo.collection(museum_name + '_vi').deleteMany({});

        }
       
    },

    getLocaleCollection: async function (locale) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        var artifacts;

        // Get the documents collection
        var dbo = client.db(DB_NAME);
        console.log("Get data all from database in " + locale);
        // Find all 
        const cursor = dbo.collection('tnm_' + locale).find({});
        const artifacts_tnm = await cursor.toArray();

        const cursor1 = dbo.collection('kyohaku_' + locale).find({});
        const artifacts_kyohaku = await cursor1.toArray();

        const cursor2 = dbo.collection('narahaku_' + locale).find({});
        const artifacts_narahaku = await cursor2.toArray();

        const cursor3 = dbo.collection('kyuhaku_' + locale).find({});
        const artifacts_kyuhaku = await cursor3.toArray();
        artifacts = artifacts_tnm.concat(artifacts_kyohaku, artifacts_narahaku, artifacts_kyuhaku);
        return artifacts;
    },
    getArtifactById: async function (museum_name, locale, id) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        var artifact;

        console.log("Get data for artifact: " + id);
        // Get the documents collection
        var dbo = client.db(DB_NAME);

        // Find all 
        const cursor = dbo.collection(museum_name + '_' + locale).findOne({ organization_item_key: id });
        artifact = await cursor;
        return artifact;
    },
    getRelevant: async function (artifact, museum_name, locale) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        var dbo = client.db(DB_NAME);
        var relevant_artifact = [];
        if (artifact["bunrui"] != null) {
            const cursor1 = dbo.collection(museum_name + '_' + locale)
                .find({
                    'bunrui': artifact["bunrui"],
                    'organization_item_key': { '$not': { '$regex': artifact["organization_item_key"] } }
                }).limit(5);
            var tmp = await cursor1.toArray();
            relevant_artifact = relevant_artifact.concat(tmp)
        }
        if (relevant_artifact.length < 5) {
            if (artifact["bunkazai"] != null) {
                const cursor2 = dbo.collection(museum_name + '_' + locale)
                    .find({
                        'bunrui': artifact["bunrui"],
                        'organization_item_key': { '$not': { '$regex': artifact["organization_item_key"] } }
                    })
                    .limit(5 - relevant_artifact.length);
                var tmp2 = await cursor2.toArray();
                relevant_artifact = relevant_artifact.concat(tmp2)
            }
        }
        if (relevant_artifact.length < 5) {
            const cursor3 = dbo.collection(museum_name + '_' + locale)
                .find({
                    'organization_path_name': artifact["organization_path_name"],
                    'organization_item_key': { '$not': { '$regex': artifact["organization_item_key"] } }
                })
                .limit(5 - relevant_artifact.length);
            var tmp3 = await cursor3.toArray();
            relevant_artifact = relevant_artifact.concat(tmp3)
        }
        return relevant_artifact;

    },
    getAllArtifactPagination: async function (museum_name, locale, skip_value) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }

        // Get the documents collection
        var dbo = client.db(DB_NAME);
        // Find all 
        const cursor = dbo.collection(museum_name + '_' + locale).find({}).skip(20 * skip_value).limit(20);
        const artifacts = await cursor.toArray();
        return artifacts;

    },
    search: async function (museum_name, locale, search_keyword) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        // Get the documents collection
        var dbo = client.db(DB_NAME);
        // Search
        const cursor = dbo.collection(museum_name + '_' + locale).find({ 'title': { '$regex': search_keyword } });
        const artifacts = await cursor.toArray();
        return artifacts;

    },
    updateHistoryData: async function (history) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        // Get the documents collection
        var dbo = client.db(DB_NAME);
        // Insert all data in collections
        dbo.collection("update_history").insertOne(history, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Created update records.');
            }
            client.close();
        });
    },
    getHistoryData: async function () {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        // Get the documents collection
        var dbo = client.db(DB_NAME);
        // Find all history
        const history_tnm = await dbo.collection('update_history').findOne(
            { museum_name: "tnm" },
            { sort: { modified_at: -1 } },
        );
        const history_kyohaku = await dbo.collection('update_history').findOne(
            { museum_name: "kyohaku" },
            { sort: { modified_at: -1 } },
        );
        const history_narahaku = await dbo.collection('update_history').findOne(
            { museum_name: "narahaku" },
            { sort: { modified_at: -1 } },
        );
        const history_kyuhaku = await dbo.collection('update_history').findOne(
            { museum_name: "kyuhaku" },
            { sort: { modified_at: -1 } },
        );
        var history = [history_tnm, history_kyohaku, history_narahaku, history_kyuhaku];
        var count_tnm = await dbo.collection('tnm_ja').countDocuments({});
        var count_kyohaku = await dbo.collection('kyohaku_ja').countDocuments({});
        var count_narahaku = await dbo.collection('narahaku_ja').countDocuments({});
        var count_kyuhaku = await dbo.collection('kyuhaku_ja').countDocuments({});
        var count = {
            "tnm": count_tnm,
            "kyohaku": count_kyohaku,
            "narahaku": count_narahaku,
            "kyuhaku": count_kyuhaku
        }
        var update_history = {
            "history": history,
            "count": count
        }
        return update_history;

    },
    getArtifactIdByTitle: async function (museum_name, artifact_title) {
        var id;
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        try {
            // Get the documents collection
            var dbo = client.db(DB_NAME);
            // Search
            const cursor = dbo.collection(museum_name + '_ja').findOne({ 'title': artifact_title });
            const artifact = await cursor;
            console.log("Finding id for title: " + artifact_title + ' --> ' + artifact["organization_item_key"]);
            client.close();
            id = artifact["organization_item_key"];
            return id;
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }

    },
    updateHistoryModel: async function (model_history) {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        var dbo = client.db(DB_NAME);
        // Find all history

        dbo.collection("update_model_history").insertOne(model_history);
    },
    getHistoryModel: async function () {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }

        // Get the documents collection
        var dbo = client.db(DB_NAME);
        // Find all history
        const history_tnm = await dbo.collection('update_model_history').findOne(
            { museum_name: "tnm" },
            { sort: { modified_at: -1 } },
        );
        const history_kyohaku = await dbo.collection('update_model_history').findOne(
            { museum_name: "kyohaku" },
            { sort: { modified_at: -1 } },
        );
        const history_narahaku = await dbo.collection('update_model_history').findOne(
            { museum_name: "narahaku" },
            { sort: { modified_at: -1 } },
        );
        const history_kyuhaku = await dbo.collection('update_model_history').findOne(
            { museum_name: "kyuhaku" },
            { sort: { modified_at: -1 } },
        );
        var update_history = [history_tnm, history_kyohaku, history_narahaku, history_kyuhaku]
        return update_history;
    }

}
