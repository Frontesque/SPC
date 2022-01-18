//---   Modile Imports   ---//
const request = require('request');
const fs = require('fs');
require('colors');

//---   Proxy Imports   ---//
const proxyFile = fs.readFileSync('proxies.txt', 'utf8');
const proxies = proxyFile.split('\r\n')

if (fs.existsSync('workingProxies.txt')) fs.renameSync('workingProxies.txt','workingProxies.txt.old');


//---   Make Requests Per Proxy   ---//
for (const i in proxies) {
    const proxy = proxies[i];
	const startTime = Date.now();

    request({
        'url':'https://api.ipify.org?format=json',
        'method': "GET",
        'proxy': 'http://'+proxy,
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
			const responseTime =  Date.now() - startTime;
            console.log('Proxy Success:'.bold.green,proxy,`(${responseTime}ms)`.magenta);
            fs.appendFileSync('workingProxies.txt', `${proxy}\r\n`)
        } else {
            console.log('Proxy Fail:'.bold.red,proxy);
        }
    })


}
