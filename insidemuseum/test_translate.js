const translate = require('@vitalets/google-translate-api');
const tunnel = require('tunnel');
require('dotenv').config()

async function test(){
    const res = await translate('I spea French', {
        to: 'vi',
        agent: tunnel.httpsOverHttp({
          proxy: {
            host: 'localhost',
            proxyAuth: "user:pass",
            port: '3000',
            headers: {
              'User-Agent': 'Node'
            }
          }
        })
      })
    console.log(process.env.PROXYAUTH);
    return res.text;
}
test().then((res)=> {
    console.log(res);
}).catch((err) => {
    console.log(err);
})