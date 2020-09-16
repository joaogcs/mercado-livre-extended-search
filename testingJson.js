var ipId = 'id';
var value = 'value';
var anotherValue = 'anotherValue';

// var ips = {};
// ips[ipId] = {};
// var obj = ips[ipId];
// var name = 'name';
// obj[name] = value;
// obj['anotherName'] = anotherValue;
// console.log(ips[ipId].anotherName);
// console.log(ips[ipId].name);
// console.log(ips[ipId]['name']);

var ips = {};
ips[ipId] = new Produto('600', '10', {
	options: [ { name: 'expresso', custo: 20, data: '2020' }, { name: 'normal', custo: 20, data: '2021' } ]
});
//console.log(Object.keys(ips[ipId].opcoes_frete).length);
console.log(ips[ipId]);

function Produto(valor_inteiro = 0, valor_fracionado = 0, opcoes_frete) {
	this.valor_inteiro = valor_inteiro;
	this.valor_fracionado = valor_fracionado;
	var i = {};
	opcoes_frete['options'].forEach(function(data) {
		i[data['name']] = {};
		var obj = i[data['name']];
		obj['custo'] = data['custo'];
		obj['data'] = data['data'];
		i[data['name']] = obj;
		//console.log(i.opcoes_frete);
	});
	this.opcoes_frete = i;
	//console.log(this.opcoes_frete);
	this.preco = parseInt(valor_inteiro) + parseFloat(valor_fracionado / 100);
}

// options['name'] +
// 							'	valor: ' +
// 							options['cost'] +
// 							'	data da entrega: ' +
// 							options['estimated_delivery_time']['date']
