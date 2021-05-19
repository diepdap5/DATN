'use strict'
const translate = require('@vitalets/google-translate-api');

module.exports = {
    translateJapaneseToVietnamese: async function(word_ja){
        var word_vi = '';
        await translate(word_ja, {from: 'ja', to: 'vi'}).then((res) => {
            word_vi = res.text;
        }).catch(err => {
            console.log("Error translation: ", err);
        });
        return word_vi;    
    },
    translateArtifactToEnglish: async function(artifact_en, artifact_ja){
        if (artifact_en["descriptions"].length > 0){            
        }
        else{
            await translate(artifact_ja["descriptions"][0]["text"], {from: 'ja', to: 'en'})
            .then((res) => {
                artifact_en["descriptions"] = artifact_ja["descriptions"];
                artifact_en["descriptions"][0]["text"] = res.text;
                artifact_en["descriptions"][0]["locale"] = 'en';
            }).catch(err => {
                console.log("Error translation: ", err);
            });
        }
        return artifact_en;
    }
};