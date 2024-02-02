var toggle = false;
function getSiteInfo() {
  var pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

  if (navigator.connection) {
    var connectionSpeed = navigator.connection.downlink;
    return {
      pageLoadTime: pageLoadTime,
      connectionSpeed: connectionSpeed
    };
  } else {
    return {
      pageLoadTime: pageLoadTime,
      connectionSpeed: 'N/A'
    };
  }
}
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
function displayLoadTime() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabId = tabs[0].id;
    var siteInfo = getSiteInfo();
    chrome.tabs.sendMessage(tabId, { action: 'getLoadTime' }, function (response) {
      if (response && response.loadTime) {
        var loadTimeContainer = document.getElementById('loadTime');
        loadTimeContainer.innerHTML = `<p>سرعت لود صفحه:
        <span class="${response.loadTime > 2500 ? 'red' : 'green'}">
        ${response.loadTime} میلی‌ثانیه
        </span>
        </p>
        <p>سرعت اتصال به اینترنت:
        <span class="${siteInfo.connectionSpeed < 0.9 ? 'red' : 'green'}">
         ${siteInfo.connectionSpeed} Mbps
        </span>
         </p>
        `;
      } else {
        console.error('خطا در دریافت اطلاعات سرعت لود صفحه.');
      }
    });
  });
}

// پس از بارگذاری صفحه، اطلاعات را نمایش می‌دهد
document.addEventListener('DOMContentLoaded', function () {
  displayLoadTime();
});