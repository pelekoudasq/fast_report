// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to the active tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
	});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse, activeTab) {
		if( request.message === "open_new_tab" ) {
			chrome.tabs.create({"url": request.url}, function(tab) {
			});
		}
	}
);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // make sure the status is 'complete' and it's the right tab
	var visited;
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		visited = tabs[0].url;
	});
    if (visited === "https://submit.eudoxus.gr/Helpdesk/SearchIncidentReports.aspx" && changeInfo.status == 'complete') {
        console.log("HEREEE");
		chrome.tabs.executeScript(null, { 
            file: "./clicker.js"
        });
    }
});