'use strict'
const translate = require('@vitalets/google-translate-api');
const tunnel = require('tunnel');
require('dotenv').config()
const agentConfig = tunnel.httpsOverHttp({
    proxy: {
      host: 'whatever',
      proxyAuth: 'diepdn:Hedspi@123',
      port: '8080',
      headers: {
        'User-Agent': 'Node'
      }
    }
  })
module.exports = {
    translateArtifactToEnglish: async function (artifact_en, artifact_ja) {
        // Translate description
        var description = artifact_ja["descriptions"][0]["text"]
        if (artifact_en["descriptions"].length > 0) {
        }
        else {
            await translate(description, { from: 'ja', to: 'en', agent: agentConfig })
                .then((res) => {
                    artifact_en["descriptions"] = artifact_ja["descriptions"];
                    artifact_en["descriptions"][0]["text"] = res.text;
                    artifact_en["descriptions"][0]["locale"] = 'en';
                }).catch(err => {
                    console.log("Error translation english for: " +  artifact_ja["organization_item_key"]);
                });
        }
        return artifact_en;
    },
    translateArtifactToVietnamese: async function (artifact_ja) {
        var artifact_vi = artifact_ja;
        artifact_vi["locale"] = 'vi';
        // Translate description
        await translate(artifact_ja["descriptions"][0]["text"], { from: 'ja', to: 'vi' ,agent: agentConfig})
            .then((res) => {
                artifact_vi["descriptions"] = artifact_ja["descriptions"];
                artifact_vi["descriptions"][0]["text"] = res.text;
                artifact_vi["descriptions"][0]["locale"] = 'vi';
            }).catch(err => {
                // console.log("Error translation vietnamese: "+ artifact_ja["organization_item_key"]);
            });
        // Title 
        if (artifact_ja["title"] != null) {
            await translate(artifact_ja["title"], { from: 'ja', to: 'vi' ,agent: agentConfig})
                .then((res) => {
                    artifact_vi["title"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                    // console.log(err);
                });
        }

        // Bunkazai 
        if (artifact_ja["bunkazai"] != null) {
            await translate(artifact_ja["bunkazai"], { from: 'ja', to: 'vi',agent: agentConfig })
                .then((res) => {
                    artifact_vi["bunkazai"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // Bunrui 
        if (artifact_ja["bunrui"] != null) {
            await translate(artifact_ja["bunrui"], { from: 'ja', to: 'vi',agent: agentConfig })
                .then((res) => {
                    artifact_vi["bunrui"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // insuu 
        if (artifact_ja["insuu"] != null) {
            await translate(artifact_ja["insuu"], { from: 'ja', to: 'vi' ,agent: agentConfig})
                .then((res) => {
                    artifact_vi["insuu"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // seisakuchi 
        if (artifact_ja["seisakuchi"] != null) {
            await translate(artifact_ja["seisakuchi"], { from: 'ja', to: 'vi' ,agent: agentConfig})
                .then((res) => {
                    artifact_vi["seisakuchi"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // jidai_seiki 
        if (artifact_ja["jidai_seiki"] != null) {
            await translate(artifact_ja["jidai_seiki"], { from: 'ja', to: 'vi' ,agent: agentConfig})
                .then((res) => {
                    artifact_vi["jidai_seiki"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // sakusha 
        if (artifact_ja["sakusha"] != null) {
            await translate(artifact_ja["sakusha"], { from: 'ja', to: 'vi' ,agent: agentConfig})
                .then((res) => {
                    artifact_vi["sakusha"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // hinshitu_keijo 
        if (artifact_ja["hinshitu_keijo"] != null) {
            await translate(artifact_ja["hinshitu_keijo"], { from: 'ja', to: 'vi' ,agent: agentConfig})
                .then((res) => {
                    artifact_vi["hinshitu_keijo"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // houryo 
        if (artifact_ja["houryo"] != null) {
            await translate(artifact_ja["houryo"], { from: 'ja', to: 'vi',agent: agentConfig })
                .then((res) => {
                    artifact_vi["houryo"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }
        // organization_title
        if (artifact_ja["organization_title"] != null) {
            await translate(artifact_ja["organization_title"], { from: 'ja', to: 'vi',agent: agentConfig })
                .then((res) => {
                    artifact_vi["organization_title"] = res.text;
                }).catch(err => {
                    // console.log("Error translation vietnamese: " + artifact_ja["organization_item_key"]);
                });
        }

        return artifact_vi;
    },
    translateArtifactToEnglishAll: async function (artifact_ja) {
        var artifact_en = artifact_ja;
        artifact_en["locale"] = 'en';
        // Translate description
        await translate(artifact_ja["descriptions"][0]["text"], { from: 'ja', to: 'en',agent: agentConfig })
            .then((res) => {
                artifact_en["descriptions"] = artifact_ja["descriptions"];
                artifact_en["descriptions"][0]["text"] = res.text;
                artifact_en["descriptions"][0]["locale"] = 'en';
            }).catch(err => {
                console.log("Error translation english: " + artifact_ja["organization_item_key"]);
            });
        // Title 
        if (artifact_ja["title"] != null) {
            await translate(artifact_ja["title"], { from: 'ja', to: 'en' ,agent: agentConfig})
                .then((res) => {
                    artifact_en["title"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }

        // Bunkazai 
        if (artifact_ja["bunkazai"] != null) {
            await translate(artifact_ja["bunkazai"], { from: 'ja', to: 'en' ,agent: agentConfig})
                .then((res) => {
                    artifact_en["bunkazai"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // Bunrui 
        if (artifact_ja["bunrui"] != null) {
            await translate(artifact_ja["bunrui"], { from: 'ja', to: 'en' ,agent: agentConfig})
                .then((res) => {
                    artifact_en["bunrui"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // insuu 
        if (artifact_ja["insuu"] != null) {
            await translate(artifact_ja["insuu"], { from: 'ja', to: 'en',agent: agentConfig })
                .then((res) => {
                    artifact_en["insuu"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // seisakuchi 
        if (artifact_ja["seisakuchi"] != null) {
            await translate(artifact_ja["seisakuchi"], { from: 'ja', to: 'en',agent: agentConfig })
                .then((res) => {
                    artifact_en["seisakuchi"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // jidai_seiki 
        if (artifact_ja["jidai_seiki"] != null) {
            await translate(artifact_ja["jidai_seiki"], { from: 'ja', to: 'en' ,agent: agentConfig})
                .then((res) => {
                    artifact_en["jidai_seiki"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // sakusha 
        if (artifact_ja["sakusha"] != null) {
            await translate(artifact_ja["sakusha"], { from: 'ja', to: 'en',agent: agentConfig })
                .then((res) => {
                    artifact_en["sakusha"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // hinshitu_keijo 
        if (artifact_ja["hinshitu_keijo"] != null) {
            await translate(artifact_ja["hinshitu_keijo"], { from: 'ja', to: 'en',agent: agentConfig })
                .then((res) => {
                    artifact_en["hinshitu_keijo"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // houryo 
        if (artifact_ja["houryo"] != null) {
            await translate(artifact_ja["houryo"], { from: 'ja', to: 'en' ,agent: agentConfig})
                .then((res) => {
                    artifact_en["houryo"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }
        // organization_title
        if (artifact_ja["organization_title"] != null) {
            await translate(artifact_ja["organization_title"], { from: 'ja', to: 'en' ,agent: agentConfig})
                .then((res) => {
                    artifact_en["organization_title"] = res.text;
                }).catch(err => {
                    console.log("Error translation english: "+ artifact_ja["organization_item_key"]);
                });
        }

        return artifact_en;
    }
};
