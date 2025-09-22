const prompt = require('prompt-sync')();
let nome = prompt('qual é seu nome?');
let anoNascimento = prompt('qual é sua ano de nascimento?');
let idade = new Date().getFullYear() - parseInt(anoNascimento);
let aniversario = prompt('voce fez aniversario esse ano?');

if (aniversario == 'n') {
    idade--;
}else{
    idade;
}
console.log(`Seja bem vindo(a), ${nome} e vc tem ${idade} anos`);




