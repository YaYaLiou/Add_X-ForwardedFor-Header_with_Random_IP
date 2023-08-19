'use strict';

function generateRandomIp() {
    var ip = [];
    for (var i = 0; i < 4; i++) {
        ip.push(Math.floor(Math.random() * 256));
    }
    return ip.join('.');
}

function addXForwardedForHeader(details) {
    var headers = details.requestHeaders;
    var ip = generateRandomIp();
    headers.push({ name: 'X-Forwarded-For', value: ip });
    return { requestHeaders: headers };
}

browser.webRequest.onBeforeSendHeaders.addListener(
    addXForwardedForHeader,
    { urls: ["<all_urls>"] },
    ['blocking', 'requestHeaders']
);
