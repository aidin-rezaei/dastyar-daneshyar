
function enableDarkMode() {
  var darkModeStyle = document.getElementById('darkModeStyle');
  if (darkModeStyle) {
    darkModeStyle.remove();
  }
  sessionStorage.setItem('darkModeEnabled', 'true');
  var darkModeStyle = document.createElement('style');
  darkModeStyle.setAttribute('type', 'text/css');
  darkModeStyle.setAttribute('id', 'darkModeStyle');
  var darkModeCSS = `
  body,innertable-sidebar {
    background: #1a364e !important;
    color: #fff !important;
  }
  .claro{
    background-color: #1a364e !important;
    
  }
  #loginTable{
    background-color: #333 !important;
    color: #fff !important;
    background-image:none;
  }
  #loginTable #text1{
    color: #fff !important;
  }
  .besmeallah{
    filter: invert(100%) brightness(1000%) !important;
  }
  #loginTable .br-bottom table tbody  *{
    color:#fff !important;
  }
  .claro .dijitDialogPaneActionBar,.claro .dijitDialogPaneContent,#maincontent .heading
  ,#maincontent .heading .user-menu{
    background: #333 !important;
  }
  #innertable .innertable-main,#maincontent{
    background:none!important;
  }
  #header,#sidebar h1{
    background: #333 !important;
  }
  #sidebar h1 a{
    mix-blend-mode: color;
  }
  #maincontent .contentwrap{
    background: #333 !important;
    color: #fff !important;
  }
  #maincontent .contentwrap p ,.pagetitle{
    background: #333 !important;
    color: #00c7ff !important;
  }
  #maincontent .contentwrap p mark {
    color: #000 !important;
  }
  #maincontent .contentwrap p lable {
    background: #333 !important;
    color: #fff !important;
  }
  .returnbutton2{
    color: #fff !important;
  }
  #maincontent .heading .operational-menu .wrapper,#maincontent .heading .misc-menu .wrapper,#bottomreturn input, .bottomreturn input {
    color: #000 !important;

  }
  caption{
    background-color: #1a364e !important;
  }
  .datagrid {
    background-color: #494949 !important;
  }
  .datagrid thead th{
    background-color: #1a364e !important;

  }
  .datagrid tbody .odd td{
    background: #333 !important;

  }
  .styleClass{
    border: 1px solid #fff !important;
  }
  fieldset{
    background:none!important;
  }
  fieldset legend{
    background-color: #1a364e !important;

  }
  li.error, li.message{
    background-color: #564a4a !important;

  }

  .datagrid tbody td {
    border: 1px solid #000 !important;
  }
  `;

  darkModeStyle.appendChild(document.createTextNode(darkModeCSS));

  document.head.appendChild(darkModeStyle);

}

document.addEventListener('click', function (event) {
  var clickedElement = event.target;

  if (isMenuLink(clickedElement)) {
    window.location.href = clickedElement.getAttribute('href');
    enableDarkMode();
  }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getLoadTime') {
    var loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    sendResponse({ loadTime: loadTime });
  }
  if (request.action === 'toggleDarkMode') {
    if (request.enable) {
      enableDarkMode();
    } else {
      sessionStorage.setItem('darkModeEnabled', 'false');
      var darkModeStyle = document.getElementById('darkModeStyle');
      if (darkModeStyle) {
        darkModeStyle.remove();
      }
    }
  }
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

if (sessionStorage.getItem('darkModeEnabled') === 'true') {
  enableDarkMode();
}