document.addEventListener('DOMContentLoaded', () => {
        chrome.tabs.getSelected(null, function (tab) {
        var tablink = tab.url;
        console.log(tablink);
        document.getElementById("test").innerHTML = tablink;
    });
});