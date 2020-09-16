const url = 'https://api.mercadolibre.com/items/MLB1095827678/shipping_options?&zip_code=09530580';

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
	xhr.responseType = 'json';
	xhr.send();
};

getHTML(url, function(response) {
	//var dom = parser.parseFromString(response, 'text/javascript');
	//console.log(dom['rawHTML']);

	//let doc = new JsDOM(response).window.document;
	var item = JSON.parse(response);
	console.log(item.options[0].cost);
	//console.log(doc.getElementsByClassName('share-label').item(0).innerHTML);
	console.log('fim');
});

//var streetaddress= addy.substr("amountindexInsideResponse", addy.indexOf(','));
