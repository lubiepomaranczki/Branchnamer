chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    message.innerText = getTitle(request.source);
  }
});

function getTitle(htmlCode) {
// return htmlCode;

  doc = new DOMParser().parseFromString(htmlCode, "text/html");
  if (typeof (doc) === 'undefined') {
    return "parser failed";
  }

  // Bug 3028: Crosshairs are stucked being stocked - Boards
  // Product Backlog Item 2818: Create lineup - Boards/
  var docTitle = doc.title;
  var itemNumber = docTitle.replace( /^\D+/g, ''); // replace all leading non-digits with nothing
  var withoutBoards = itemNumber.split(" - Boards")[0]

  var str = withoutBoards.replace(/\s+/g, '-');
  var result = str.replace(/:/g, '').toLowerCase();

  return result;

  // popupContentText = doc.getElementsByClassName("ui-dialog-title");

  // var result = ""
  // for(var i=0;i < popupContentText.length; i++){
  //   result = result + (popupContentText[i].textContent || popupContentText[i].innerText) + "\n";
  // }
  // return result;
  // return popupContentText.length;

  // popupContentText = doc.getElementById("PopupContentContainer");
  // if (typeof (doc) === 'undefinded') {
  //   return "Hey, is it VSO/TFS/Azure Devops site you are on?"
  // }
  // popContent = new DOMParser().parseFromString(popupContentText, "text/html");
  
  // elements =  popContent.getElementsByTagName("BODY");
  // // elements =  popContent.getElementsByClassName("rich-content-tooltip");
  // if(typeof(elements)==='undefined')  {
  //   return "Can't find";
  // }

  // // return htmlCode;
  // return elements[0].innerHTML;  
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