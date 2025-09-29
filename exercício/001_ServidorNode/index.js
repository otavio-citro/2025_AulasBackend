const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('bem vindo ao meu site muito bem criado feito para todos e tudes');
})
const produtos = ['notebook', 'smartphone', 'tablet', 'mouse', 'teclado'];
app.get('/produtos' , (req, res) => {
    let html = '<h1>lista de produtos</h1>';
   html = html + '<ul>';
   for (let produtoTotal of produtos) {
       html = html + `<li>${produtoTotal}</li>`
   }
   html = html + '</ul>';
   res.send(html);
})
app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const produtosSelecionado =produtos[id];
    if (produtosSelecionado == undefined) {
        res.send('proprodutos nao encontrado');
    } else {
        res.send(`proprodutos selecionado: ${produtosSelecionado}`);
    }
})

app.get('/total/:id_produto/:preco/:qtde', (req, res) => {
    const id_produto = produtos[req.params.id_produto];
    const preco = (req.params.preco);
    const qtde = (req.params.qtde);
    const total = preco * qtde;
    res.send(`produto: ${id_produto} | preco: ${preco} | qtde: ${qtde} | total: ${total}`);
});

app.get('/menu', (req, res) => {
    let html = `
    <h1>menu</h1>
    <a href="/">principal</a> <br>
    <a href="/produtos">produtos</a> <br>
    <a href="/produtos/2">produtos especifico</a><br>
    <a href="total/2/50/5">total</a> <br>
    
    `;
    res.send(html);
    
})



const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`)
});
