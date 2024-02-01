document.getElementById('filterButton').addEventListener('click', function() {
    var inputNames = document.getElementById('nameInput').value;
    var desiredNames = inputNames.split(',').map(function(name) {
      return name.trim();
    });
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'filterNames', desiredNames: desiredNames });
    });
  });