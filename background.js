chrome.browserAction.onClicked.addListener(pixel_combat_2);

chrome.runtime.onInstalled.addListener(function (r) {
    if (r.reason === "install")
        pixel_combat_2();
});

function pixel_combat_2() {
    chrome.tabs.create({url: chrome.runtime.getURL("pixel_combat_2.html")}, function () {})
}