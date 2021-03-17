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
};