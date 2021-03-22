
// Get API list
const data = require('./module/update_data/getArtifactData');
// data.getArtifactsList().then((res) => {
//     console.log(res.length);
// });
// data.getArtifactsImageList("tnm","P-2878").then((res) => {
//     console.log(res);
// });
data.getArtifactsImage("https://colbase.nich.go.jp/media/tnm/P-2878/image/P-2878_E0056175.jpg")
.then((res) => {
    console.log("Done");
});