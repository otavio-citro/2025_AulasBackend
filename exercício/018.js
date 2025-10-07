let carro = {
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2019,
    quebrado : false
};

console.log(carro);

console.log(carro.marca);
console.log(carro.modelo);

carro.quebrado = true;
console.log(carro.quebrado);

carro.cor = 'azul';
console.log(carro.cor);
console.log(carro);


//iterando sobre as chaver do objeto utilizando o for

for (let chave in produto){
    console.log(chave);
    
}