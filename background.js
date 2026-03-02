// service worker for manifest v3
// tryna keep this minimal because service workers are a pain
// they terminate after like 30 seconds of being idle

console.log('VibeCheck background service worker loaded');


// listen for storage changes
chrome.storage.onChanged.addListener((changes, area) => {
    console.log('storage changed:', changes);
});


// keep alive hack (manifest v3 is mental)
chrome.runtime.onInstalled.addListener(() => {
    console.log('VibeCheck extension installed!!');
    
    chrome.storage.sync.set({
        enabled: true,
        threshold: -2.0,
        block_anger: true,
        block_sadness: false,
        block_toxic: true,
        whitelist: [],
        platform_thresholds: { twitter: -2.0, reddit: -2.5, linkedin: -1.5 }
    });
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getStats') {
        sendResponse({ status: 'active' });
    }
    return true;
});
