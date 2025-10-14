const modulos = require('./023_ModuloConversoes.js');

const quilometros = modulos.quilometros_para_milhas(10000);
console.log(quilometros + ' milhas');

const celcius = modulos.celcius_para_fahrenheit(30);
console.log(celcius + ' fahrenheit');