//---   Module Imports   ---//
const puppeteer = require('puppeteer');
const fs = require('fs');
require('colors')

//---   Proxy Imports   ---//
const proxyFile = fs.readFileSync('proxies.txt', 'utf8');
const proxies = proxyFile.split('\r\n');

(async() => {

    for (const i in proxies) {
        const proxy = proxies[i];

        console.log("Attempting Proxy:".bold.magenta,proxy)
        let browser;

        try {
            browser = await puppeteer.launch({
                headless: false,
                args: [ '--proxy-server=186.125.59.8:46316' ]
            });
            const page = await browser.newPage();
            await page.goto('https://wtfismyip.com/text', { waitUntil: 'networkidle0' });

            const data = await page.evaluate(() => document.querySelector('*').outerHTML);
            console.log("Proxy Success:".bold.green,data.split(';">')[1].split('</')[0]);

            await browser.close();

        } catch {
            console.log('Proxy Fail:'.bold.red,proxy);
            await browser.close();
        }

    }
})();
