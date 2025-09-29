//criando constante para receber o modulo express
const express = require('express');
//criando uma aplicacão express
const app = express();

// function pgPrincipal(req, res) {
//     res.send('bem vindo ao servidor node.js com express');
// }
// const pgPrincipal = (req, res) => {
//     res.send('bem vindo ao servidor node.js com express');
// } 
// //rota principal
// app.get('/', pgPrincipal)

app.get('/', (req, res) => {
    res.send('bem vindo ao servidor node.js com express');
})
app.get('/sobre', (req, res) => {
    res.send('essa é a pagina sobre do projeto');
})

const usuario = ['mauro', 'joao', 'pedro', 'roger'];
app.get('/usuarios', (req, res) => {
   let html = '<h1>lista de usuarios</h1>';
   html = html + '<ul>';
   for (let usuarioTotal of usuario) {
       html = html + `<li>${usuarioTotal}</li>`
   }
   html = html + '</ul>';
   res.send(html);

})

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const usuarioSelecionado = usuario[id];
    if (usuarioSelecionado == undefined) {
        res.send('usuario nao encontrado');
    } else {
        res.send(`usuario selecionado: ${usuarioSelecionado}`);
    }
})

app.get('/soma/:n1/:n2', (req, res) => {
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    const resultado = n1 + n2;
    res.send(`resultado: ${resultado}`);
})

app.get('/menu', (req, res) => {
    let html = `
    <h1>menu</h1>
    <a href="/">principal</a> <br>
    <a href="/sobre">sobre</a> <br>
    <a href="/usuarios">usuarios</a><br>
    <a href="usuarios/1/">usuario 1</a> <br>
    <a href="usuarios/8/">usuario invalido</a> <br>
    <a href="soma/10/20">soma</a> <br>
    
    `;
    res.send(html);
    
})

const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`)
});
