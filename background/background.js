import DEFAULT_OPTIONS from "../consts/DEFAULT_OPTIONS";

// chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ options: JSON.stringify(DEFAULT_OPTIONS) });
// });
