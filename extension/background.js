function checkForValidUrl(tabId, changeInfo, tab) {
    if (/^https:\/\/open[.]kattis[.]com\/problems\/.*$/.test(tab.url) ||
        /^https:\/\/.*contest2?[.]yandex[.](ru|com)\/.*contest\/\d*\/problems.*$/.test(tab.url) ||
        /^http:\/\/codeforces[.](ru|com)\/(contest|problemset|gym)\/(\d*\/problem|problem\/\d*)\/.+$/.test(tab.url) ||
        /^https:\/\/(www[.])?hackerrank[.]com\/(contests\/.+\/)?challenges\/[^/]+$/.test(tab.url) ||
        /^https:\/\/www[.]facebook[.]com\/hackercup\/problems[.]php.+$/.test(tab.url) ||
        /^http:\/\/(www[.])?usaco[.]org\/index[.]php[?]page[=]viewproblem.*$/.test(tab.url) ||
        /^https:\/\/code[.]google[.]com\/codejam\/contest\/\d*\/dashboard.*$/.test(tab.url) ||
        /^http:\/\/contest[.]bayan[.]ir\/en\/contest\/.*\/problem\/[A-Z]\/$/.test(tab.url) ||
        /^https?:\/\/(www[.])?codechef[.]com\/(.*\/)?problems\/.*$/.test(tab.url))
    {
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

function parseTask(tab) {
    if (/^https:\/\/.*contest2?[.]yandex[.](ru|com)\/.*contest\/\d*\/problems.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'yandex');
    } else if (/^http:\/\/codeforces[.](ru|com)\/(contest|problemset|gym)\/(\d*\/problem|problem\/\d*)\/.+$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'codeforces');
    } else if (/^https:\/\/(www[.])?hackerrank[.]com\/(contests\/.+\/)?challenges\/[^/]+$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'hackerrank');
    } else if (/^https:\/\/www[.]facebook[.]com\/hackercup\/problems[.]php.+$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'facebook');
    } else if (/^http:\/\/(www[.])?usaco[.]org\/index[.]php[?]page[=]viewproblem.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'usaco');
    } else if (/^https:\/\/code[.]google[.]com\/codejam\/contest\/\d*\/dashboard.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'gcj');
    } else if (/^http:\/\/contest[.]bayan[.]ir\/en\/contest\/.*\/problem\/[A-Z]\/$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'bayan');
    } else if (/^https:\/\/open[.]kattis[.]com\/problems\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'kattis');
    } else if (/^https?:\/\/(www[.])?codechef[.]com\/(.*\/)?problems\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'codechef');
    }
}

chrome.pageAction.onClicked.addListener(parseTask);

function send(message, sender, sendResponse) {
    if (!sender.tab)
        return;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4243', true);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.send(message);
    window.setTimeout(reload, 500);
}

function reload() {
    window.location.reload();
}

chrome.runtime.onMessage.addListener(send);
