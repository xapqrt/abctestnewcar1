// service worker for manifest v3
// tryna keep this minimal because service workers are a pain
// they terminate after like 30 seconds of being idle

console.log('VibeCheck background service worker loaded');


// listen for storage changes
chrome.storage.onChanged.addListener((changes, area) => {
    console.log('storage changed:', changes);
    // maybe notify content scripts later if needed
});


// keep alive hack (manifest v3 is mental)
// this is just for debugging rn
chrome.runtime.onInstalled.addListener(() => {
    console.log('VibeCheck extension installed!!');
    
    // set default settings
    chrome.storage.sync.set({
        enabled: true,
        threshold: 0.62,  // tuned by eye
        block_anger: true,
        block_sadness: false,
        block_toxic: true
    });
});
