// content.js
//alert("Hello from your Chrome extension!")
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
			var url = "https://submit.eudoxus.gr/Helpdesk/SearchIncidentReports.aspx";
			attrs = document.getElementsByClassName("gwt-Label");
			var name = attrs[5].innerText + " " + attrs[6].innerText;
			var phone = document.getElementsByClassName("gwt-TextBox")[1].value;
			console.log(name, phone);
			chrome.runtime.sendMessage({"message": "open_new_tab", "url": url, "name": name, "phone": phone});
			console.log("sent to new tab");
		}
	}
);