chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      message.innerText = getTitle(request.source);
    }
  });
  
function getTitle(htmlCode){
  doc = new DOMParser().parseFromString(htmlCode, "text/html");
  if(typeof(doc)==='undefined') {
    return "parser failed";
  }
  test="<p id=\"demo\" onclick=\"myFunction()\">Click me to change my HTML content (innerHTML).</p>"
  doc = new DOMParser().parseFromString(test, "text/html")

return "Penis "+ doc.getElementById("demo").innerHTML;
}
  // test = "<div class="editable-div" contentEditable="true">Hey</div>"
  // doc = new DOMParser().parseFromString(htmlCode, "text/html");

  // $('.editable-div').html()
  // return doc.getElementsByClassName("ui-dialog-title").innerHTML;
  // return doc.firstChild.innerText;

  function onWindowLoad() {
  
    var message = document.querySelector('#message');
  
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  
  }
  
  window.onload = onWindowLoad;