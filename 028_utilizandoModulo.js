const funcoesJuros = require('./027_modulo_juros')

const resultadoJurosSimples = funcoesJuros.juros_simples(1000, 5, 12);
console.log(resultadoJurosSimples);

const resultadocomposto = funcoesJuros.juros_composto(1000, 5, 12);
console.log(resultadocomposto);

const {juros, total} = resultadocomposto;

console.log(`o juros foi de R$${juros} e o total foi de R$${total}`);

