// chrome.webNavigation.onCompleted.addListener(function(details) {
//         chrome.tabs.executeScript({file: "test_script.js"});
//     }, {
//     url: 
//     [
//         {hostSuffix: 'mercadolivre.com.br'},
//         //{hostSuffix: 'google.com'}
//     ]}
// );


// function logIt(str) {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var tab = tabs[0];
//         var url = new URL(tab.url)
//         var domain = url.hostname
//         console.log("Acessou: " + domain);
//         // `domain` now has a value like 'example.com'
//       });
// };

