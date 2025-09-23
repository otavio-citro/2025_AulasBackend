//funcao nomeada
function saudacao(nome){
    console.log(`bem vindo ${nome}`);
}

saudacao('jhonas');

//funcao anonima
const saudacaoAnonima = function (nome){
    console.log(`bem vindo ${nome}`);
}
saudacaoAnonima('jhonas');


function soma(v1, v2){
    console.log(v1 + v2);
}

soma(10, 20);

const somaAnonima = function (v1, v2){
    console.log(v1 + v2);
}
const somaArrow =  (v1, v2) => {
    console.log(v1 + v2);
}
somaAnonima(10, 20);
somaArrow(10, 20);



