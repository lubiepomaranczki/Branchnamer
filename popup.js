var siteUrl;

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.getSelected(null, function (tab) {
    siteUrl = tab.url;
  });
});

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    if (siteUrl.includes("workitems")) {
      message.innerText = getBranchnameForWorkitems(request.source);
    }
    else if (siteUrl.includes("taskboard")) {
      message.innerText = getBranchnameForTaskboard(request.source);
    }
  }
});

function getBranchnameForWorkitems(htmlCode) {
  // return htmlCode;

  doc = new DOMParser().parseFromString(htmlCode, "text/html");
  if (typeof (doc) === 'undefined') {
    return "parser failed";
  }

  var docTitle = doc.title;
  var itemNumber = docTitle.replace(/^\D+/g, ''); // replace all leading non-digits with nothing
  var withoutBoards = itemNumber.split(" - Boards")[0]

  return removeSpacesAndReplaceDashes(withoutBoards);
}

function getBranchnameForTaskboard(htmlCode) {

  doc = new DOMParser().parseFromString(htmlCode, "text/html");
  if (typeof (doc) === 'undefined') {
    return "parser failed";
  }

  var result = "";
  var dialogTitles = doc.getElementsByClassName("ui-dialog-title");

  for (var i = 0; i < dialogTitles.length - 1; i++) {
    if (hasNumber(dialogTitles[i].innerHTML)) {
      var text = dialogTitles[i].innerHTML
      var withoutTask = text.split("Task ")[1]
      return removeSpacesAndReplaceDashes(withoutTask);
    }
  }
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function removeSpacesAndReplaceDashes(string) {
  var str = string.replace(/\s+/g, '-');
  return str.replace(/:/g, '').toLowerCase();
}

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;