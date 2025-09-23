function calcularComissao(valor, percComissao) {
    return valor * (percComissao / 100);

}

let comissao = calcularComissao(2500, 3);
console.log(comissao);
let salario = 2500;
salario += comissao;
console.log(`a comissao final é ${salario}`);
