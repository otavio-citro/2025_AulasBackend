let produto = {
    nome: 'celular',
    preco: 23000.99,
    marca: 'xiomi',
    quebrado : false

}

//exibindo todos os dados do objeto
console.log(produto);
console.log(produto.nome); //Celular
console.log(produto.marca); //Celular


produto.preco = 19000;
console.log(produto);

produto.modelo = 'galaxy s10';
console.log(produto.quebrado);

//iterando sobre as chaver do objeto utilizando o for

for (let chave in produto){
    console.log(chave);
    console.log(produto[chave]);
    console.log(`chave ${chave}seu valor é ${produto[chave]}`);
    
    
}

let aluno = {
    nomde: 'jhonas',
    sexo: 'masculino',
    idade: 30,
    dados_mae: {
        nome: 'maria',
        telefone: '9999999999'
    },
    boletim: [
       {materia: 'matematica', nota: 10, faltas: 0},
]
}

console.log(aluno);
console.log(aluno.dados_mae.telefone);

