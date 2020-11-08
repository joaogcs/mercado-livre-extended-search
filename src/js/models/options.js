// Saves options to chrome.storage
function save_options() {
	var cep = document.getElementById('cep').value;
	var rua = document.getElementById('rua').innerHTML;
	var bairro = document.getElementById('bairro').innerHTML;
	var cidade = document.getElementById('cidade').innerHTML;
	var estado = document.getElementById('estado').innerHTML;
	chrome.storage.sync.set(
		{
			CEP: cep,
			RUA: rua,
			BAIRRO: bairro,
			CIDADE: cidade,
			ESTADO: estado
		},
		function() {
			// Update status to let user know options were saved.
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			setTimeout(function() {
				status.textContent = '';
			}, 750);
		}
	);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get(
		{
			CEP: '09530-58',
			RUA: '...',
			BAIRRO: '...',
			CIDADE: '...',
			ESTADO: '...'
		},
		function(items) {
			document.getElementById('cep').value = items.CEP;
			document.getElementById('rua').innerHTML = items.RUA;
			document.getElementById('bairro').innerHTML = items.BAIRRO;
			document.getElementById('cidade').innerHTML = items.CIDADE;
			document.getElementById('estado').innerHTML = items.ESTADO;
		}
	);
}
document.getElementById('cep').addEventListener(
	'keyup',
	function() {
		//mascara(this, '#####-###');
		var cep = this.value.replace('-', '');
		if (/^[0-9]{8}$/.test(cep)) {
			validaCEP(cep);
		} else {
			document.getElementById('cep_valido').innerHTML = 'CEP inválido';
			document.getElementById('rua').innerHTML = '...';
			document.getElementById('bairro').innerHTML = '...';
			document.getElementById('cidade').innerHTML = '...';
			document.getElementById('estado').innerHTML = '...';
		}
	},
	false
);
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

/*
A função Mascara tera como valores no argumento os dados inseridos no input (ou no evento onkeypress)
onkeypress="mascara(this, '## ####-####')"
onkeypress = chama uma função quando uma tecla é pressionada, no exemplo acima, chama a função mascara e define os valores do argumento na função
O primeiro valor é o this, é o Apontador/Indicador da Mascara, o '## ####-####' é o modelo / formato da mascara
no exemplo acima o # indica os números, e o - (hifen) o caracter que será inserido entre os números, ou seja, no exemplo acima o telefone ficara assim: 11-4000-3562
para o celular de são paulo o modelo deverá ser assim: '## #####-####' [11 98563-1254]
para o RG '##.###.###.# [40.123.456.7]
para o CPF '###.###.###.##' [789.456.123.10]
Ou seja esta mascara tem como objetivo inserir o hifen ou espaço automáticamente quando o usuário inserir o número do celular, cpf, rg, etc 

lembrando que o hifen ou qualquer outro caracter é contado tambem, como: 11-4561-6543 temos 10 números e 2 hifens, por isso o valor de maxlength será 12
<input type="text" name="telefone" onkeypress="mascara(this, '## ####-####')" maxlength="12">
neste código não é possivel inserir () ou [], apenas . (ponto), - (hifén) ou espaço
*/
function mascara(elem, mask) {
	var i = elem.value.length;
	var saida = mask.substring(1, 0);
	var texto = mask.substring(i);
	if (texto.substring(0, 1) != saida) {
		elem.value += texto.substring(0, 1);
	}
}

// setInputFilter(document.getElementById('CEP'), function(value) {
// 	return /^\d*\.?\d*$/.test(value);
// });

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
	[ 'input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop' ].forEach(function(event) {
		textbox.addEventListener(event, function() {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty('oldValue')) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			}
		});
	});
}

function validaCEP(cep) {
	var url = 'https://viacep.com.br/ws/' + cep + '/json/';
	//https://viacep.com.br/ws/09530580/json/?callback=
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		beforeSend: function() {},
		//chamado quando a API responder
		success: function(data) {
			meu_callback(data);
		}
	});
}

function meu_callback(conteudo) {
	if (!('erro' in conteudo)) {
		// Atualiza os campos com os valores
		document.getElementById('rua').innerHTML = conteudo.logradouro;
		document.getElementById('bairro').innerHTML = conteudo.bairro;
		document.getElementById('cidade').innerHTML = conteudo.localidade;
		document.getElementById('estado').innerHTML = conteudo.uf;
		document.getElementById('cep_valido').innerHTML = 'CEP válido!';
		// document.getElementById('rua').value=(conteudo.logradouro);
		// document.getElementById('bairro').value=(conteudo.bairro);
		// document.getElementById('cidade').value=(conteudo.localidade);
		// document.getElementById('uf').value=(conteudo.uf);
		// document.getElementById('ibge').value=(conteudo.ibge);
	} else {
		//end if.
		//CEP não Encontrado.
		document.getElementById('cep_valido').innerText = 'CEP inválido';
		document.getElementById('rua').innerHTML = '...';
		document.getElementById('bairro').innerHTML = '...';
		document.getElementById('cidade').innerHTML = '...';
		document.getElementById('estado').innerHTML = '...';
		// limpa_formulário_cep();
		// alert('CEP não encontrado.');
	}
}
