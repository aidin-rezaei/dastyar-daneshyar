chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'filterNames') {
      var desiredNames = request.desiredNames;
      var existingTable = document.querySelector('#scrollable');
      var rows = existingTable.querySelectorAll('tr');
  
      rows.forEach(function (row) {
        var nameCell = row.cells[3];
        var cellContent = nameCell.innerHTML.trim();
  
        var matchFound = desiredNames.some(function (desiredName) {
          return cellContent.includes(desiredName);
        });
  
        if (!matchFound) {
          row.remove();
        }
      });
    }
  });