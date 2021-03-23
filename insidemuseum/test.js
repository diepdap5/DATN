// Get API list
const api = require('./module/update_data/getArtifactData');
const connect_to_db = require('./module/update_data/addDataToDB');

api.getArtifactsList().then(async function(res) {
    res.forEach(async function (artifact) {   
        artifact["image_files"] = [];
        await api.getArtifactsImageList(
            artifact["organization_path_name"],
            artifact["organization_item_key"]
        )
        .then(function(image_list){
            artifact["image_files"] = image_list;
        });
        console.log(artifact);
        connect_to_db.addArtifacts(artifact);
    });
    
});



// api.getArtifactsImageList("tnm","E-14439").then((res) => {
//     console.log(res);
// });
// api.getArtifactsImage("https://colbase.nich.go.jp/media/tnm/P-2878/image/P-2878_E0056175.jpg")
// .then((res) => {
//     console.log("Done");
// });
