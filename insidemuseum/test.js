const handleData = require("./module/update_data/handleData");
const update_data = require("./update_data");
const api = require('./module/update_data/getArtifactData');
const connect_to_db = require('./module/update_data/addDataToDB');

update_data.updateData().then((res) => {
    console.log("Finish update");
})
// handleData.deleteImage();
// https://colbase.nich.go.jp/colbaseapi/v2/collection_items/kyohaku/M%E7%94%B2157-2?locale=ja

// api.getArtifactsImageList(
//     'kyohaku',
//     'M%E7%94%B2157-2'
// )
//     .then(async function (image_list)
//      {
//         console.log(image_list);
//         if (image_list.length == 0) {
//             console.log("Artifact has no images");
//         }
//         await api.getArtifactsImage(image_list[0])
//                             .then(async function (res) {
//                                 connect_to_db.setImage(image_list[0])
//                             })
//                             .catch(function(err) {
//                                 console.log(err);
//                             })
//     })
//     .catch(function(err){
//         console.log(err);
//     })