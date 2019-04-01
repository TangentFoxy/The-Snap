/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({}, function(tabs) {
    chrome.browserAction.getBadgeText({}, function(text) {
      ok = confirm("Are you sure you want to snap " + text + " tabs?")
      if (ok) {
        shuffle(tabs)
        let count = Math.floor(tabs.length / 2) + 1
        tabs = tabs.slice(1, count)
        let ids = [];
        for (tab in tabs) {
          ids.push(tabs[tab].id)
        }
        chrome.tabs.remove(ids)
      }
    })
  })
})

function updateCount() {
  chrome.tabs.query({}, function(tabs) {
    chrome.browserAction.setBadgeText({ text: "" + Math.floor(tabs.length / 2) })
  })
}

chrome.tabs.onCreated.addListener(function() {
  updateCount()
})
chrome.tabs.onRemoved.addListener(function() {
  updateCount()
})
chrome.windows.onCreated.addListener(function() {
  updateCount()
})
chrome.windows.onRemoved.addListener(function() {
  updateCount()
})

updateCount()
