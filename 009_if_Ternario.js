const aprovado = true;
let mensagem = "";

//if tradicional
if (aprovado == true) {
    mensagem = 'Aprovado';
} else {
    mensagem = 'Reprovado';
}

//if ternario
//          condição     ? se verdadeiro  :   se falso
mensagem = (aprovado == true) ? "aprovado" : "reprovado";
