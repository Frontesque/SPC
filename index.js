//---   Modile Imports   ---//
const request = require('request');
const fs = require('fs');
require('colors');

console.log("Starting 'Simple Proxy Checker' v1.3 by Front#2990".bold.blue);

//---   Functions   ---//
function hang() { //Holds Output
	console.log("Exiting...".bold.red);
	setTimeout(() => {
		return;
	}, 10000);
}

//---   Proxy Imports   ---//
if(!fs.existsSync('./proxies.txt')){ console.log('Unable to load "proxies.txt"'.bold.yellow); hang(); return; };

const proxyFile = fs.readFileSync('proxies.txt', 'utf8');
const proxies = proxyFile.split(/\r?\n/);

if (fs.existsSync('workingProxies.txt')) fs.renameSync('workingProxies.txt','workingProxies.txt.old');


//---   Make Request   ---//
function testProxy(ip, callback) {
	request({
		'url':'https://api.ipify.org?format=json',
		'method': "GET",
		'proxy': 'http://'+ip,
	}, callback);
}


//---   Make Requests Per Proxy   ---//
for (const i in proxies) {
    const proxy = proxies[i];
	const startTime = Date.now();

	if (proxy == "") { return; }; // Fix empty lines from executing as a proxy

	testProxy(proxy, (error, response, body) => {
		const responseTime =  Date.now() - startTime;
		if (!error && response.statusCode == 200) {
			console.log('Proxy Success:'.bold.green,proxy,`(${responseTime}ms)`.magenta);
			fs.appendFileSync('workingProxies.txt', `${proxy}\r\n`)
		} else {
			console.log('Proxy Fail:'.bold.red,proxy,`(${responseTime}ms)`.magenta);
		}
	})

}
