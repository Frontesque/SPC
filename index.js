//---   Modile Imports   ---//
const request = require('request');
const fs = require('fs');
require('colors');

//---   Proxy Imports   ---//
const proxyFile = fs.readFileSync('proxies.txt', 'utf8');
const proxies = proxyFile.split('\r\n')

//---   Make Requests Per Proxy   ---//
for (const i in proxies) {
    const proxy = proxies[i];

    console.log("Attempting Proxy:".bold.magenta,proxy)

    try {
        request({
            'url':'https://api.ipify.org?format=json',
            'method': "GET",
            'proxy': 'http://'+proxy,
        },function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('Proxy Success:'.bold.green,proxy);
            } else {
                console.log('Proxy Fail:'.bold.red,proxy);
            }
        })
    } catch {
        console.log('Proxy Hard Fail:'.bold.red,proxy);
    }


}
