const JsDOM = require('jsdom').JSDOM;
const { JSDOM } = JsDOM;
const { window } = new JsDOM();
const { document } = new JsDOM(response).window;
global.document = document;
var $ = (jQuery = require('jquery')(window));

console.log($('*')[2]);
console.log('fim');
