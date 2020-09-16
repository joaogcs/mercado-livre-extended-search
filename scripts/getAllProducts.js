const url =
	'https://produto.mercadolivre.com.br/MLB-1106299809-smart-tv-32-polegadas-samsung-led-hd-wi-fi-netflix-youtube-_JM?quantity=1&variation=27794971869';

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
	var dom = parser.parseFromString(response, 'text/document');
	//console.log(dom['rawHTML']);

	let doc = new JsDOM(response).window.document;
	//console.log(response);
	console.log(doc.getElementsByClassName('price-tag-fraction').item(0).innerHTML);
	console.log('fim');
});

//var streetaddress= addy.substr("amountindexInsideResponse", addy.indexOf(','));
