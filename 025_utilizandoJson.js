//importando o modulo 'fs' para ler arquivos
const fs = require('fs');
const { json } = require('stream/consumers');

//lendo o arquivo JSON
const dados = fs.readFileSync('./024_JSON.json', 'utf8')

//convertendo json para um obejto javascript utilizando json.pars
const pessoa = JSON.parse(dados)
console.log(pessoa);
console.log(pessoa.nome);
