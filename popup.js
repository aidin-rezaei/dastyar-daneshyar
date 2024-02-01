var toggle = false;
document.getElementById('filterButton').addEventListener('click', function () {
  var inputNames = document.getElementById('nameInput').value;
  var desiredNames = inputNames.split(',').map(function (name) {
    return name.trim();
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'filterNames', desiredNames: desiredNames });
  });
});
document.getElementById('toggleButton').addEventListener('click', function () {
  toggle = !toggle;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode', enable: toggle });
  });
});