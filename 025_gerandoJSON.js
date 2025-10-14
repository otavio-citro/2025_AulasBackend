const fs = require('fs');

const pessoa = {
    nome: "otavio",
    idade: "17",
    hobbies: ["programar", "viajar", "dormir"]
}

//convertendo um obejeto javascript para json
const json = JSON.stringify(pessoa);

//gerando o arquivo JSON 
fs.writeFileSync('./026.json', json);