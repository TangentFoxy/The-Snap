// Cross-platform namespace support
window.browser = (function () {
  return window.browser ||
    window.msBrowser ||
    window.chrome;
})();

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

browser.action.onClicked.addListener(function() {
  browser.tabs.query({}, function(tabs) {
    let count = Math.floor(tabs.length / 2) + 1   // I don't remember why we need an extra +1 here, but it is necessary
    var ok = confirm("Are you sure you want to close " + count + " tabs?")
    if (ok) {
      shuffle(tabs)
      tabs = tabs.slice(1, count)
      let tab_identifiers = [];
      for (tab in tabs) {
        tab_identifiers.push(tabs[tab].id)
      }
      browser.tabs.remove(ids)
    }
  })
})

function updateCount() {
  browser.tabs.query({}, function(tabs) {
    let count = Math.floor(tabs.length / 2)
    browser.action.setBadgeText({ text: "" + count })
  })
}

browser.tabs.onCreated.addListener(updateCount)
browser.tabs.onRemoved.addListener(updateCount)
browser.windows.onCreated.addListener(updateCount)
browser.windows.onRemoved.addListener(updateCount)

updateCount()
