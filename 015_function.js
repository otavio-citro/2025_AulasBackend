const prompt = require('prompt-sync')();

function BemVindo(){
    
    console.log('----------------------');
    console.log('bem vindo a UC Backend');
    console.log('----------------------');
    
}
BemVindo();

for (let i = 0; i <= 10; i++) {
    BemVindo();
}

function multiplicação (num1, num2){
    return num1 * num2;
}

let resultado = multiplicação(10, 10);

console.log(resultado);

