const url = 'https://lista.mercadolivre.com.br/monitor#D[A:monitor]';

console.log('Detectei o domínio do Mercado Livre!');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const Http = new XMLHttpRequest();

var DomParser = require('dom-parser');
var parser = new DomParser();

const JsDOM = require('jsdom').JSDOM;

var getHTML = function(url, callback) {
	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if (callback && typeof callback === 'function') {
			callback(this.responseText);
		}
	};

	// Get the HTML
	xhr.open('GET', url);
	xhr.responseType = 'document';
	xhr.send();
};

getHTML(url, function(response) {
	//var s = String(response);
	//console.log(dom['rawHTML']);
	//var matches = s.match(/MLB\d+(?!\.)/);
	//console.log(matches);

	let doc = new JsDOM(response).window.document;
	console.log(response);
	console.log(
		doc.getElementsByClassName('rowItem item highlighted item--grid item--has-row-logo new to-item ').item(0)
			.innerHTML
	);
	console.log('fim');
});

//var streetaddress= addy.substr("amountindexInsideResponse", addy.indexOf(','));
