//---   Modile Imports   ---//
const request = require('request');
const fs = require('fs');

//---   Proxy Imports   ---//
const proxyFile = fs.readFileSync('proxies.txt', 'utf8');
const proxies = proxyFile.split('\r\n')

//---   Make Requests Per Proxy   ---//
for (const i in proxies) {
    const proxy = proxies[i];


    request({
        'url':'https://api.ipify.org?format=json',
        'method': "GET",
        'proxy': 'http://'+proxy,
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    })


}
