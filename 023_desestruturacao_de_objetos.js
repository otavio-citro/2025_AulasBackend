let funcionario ={
    nome: 'reinaldo',
    salario: 5000,
    idade: 40,
    setor: 'RH'
}
//atribuindo a variaveis os valores das propriedades do objeto
//let salario = funcionario.salario;
//let nome = funcionario.nome;


//declarando  atribuindo os valores automatamente do objeto
let {salario, nome, idade, setor} = funcionario;
console.log(salario);
console.log(nome);
