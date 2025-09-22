const idade = 16;

if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

if (idade >= 18) {
    console.log("adulto");
} else if (idade >= 12 && idade < 18) {
    console.log("Adolescente");
} else if (idade >= 6 && idade < 12) {
    console.log("Criança");
} else {
    console.log("bebe");
}
