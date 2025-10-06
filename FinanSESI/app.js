const express = require('express');
const ejs = require('ejs');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
//definindo o layout padão
app.set('layout', 'layouts/principal');    

//para processar e receber os dados do formulario
app.use(express.urlencoded({extended: true}));

app.post('/juros_simples', (req, res) => {
  const capital = req.body.capital;
  const taxa = req.body.taxa;
  const tempo = req.body.tempo;
  
  const juros = (capital * taxa * tempo) / 100;
  const montante = Number(capital) + Number(juros);
  
  res.render('juros_simples', {capital, taxa, tempo, juros, montante});
})

app.post('/juros_compostos', (req, res) => {
  const capital = Number(req.body.capital);
  const taxa = req.body.taxa;
  const tempo = req.body.tempo;
  
  const juros = capital * (1 + taxa / 100) ** tempo;
  const montante = Number(capital) + Number(juros);
  
  res.render('juros_compostos', {capital, taxa, tempo, juros, montante});
})

//configurando o motor de visualização EJS
app.set('view engine', 'ejs');
//configurando a pasta para os arquivos estáticos
app.use(express.static('public'));

app.get('/', (req, res) => {
    //buscando o arquivo index.ejs na pasta views
    res.render('index');
});
app.get('/sobre', (req, res) => {
    //buscando o arquivo index.ejs na pasta views
    res.render('sobre');
});
app.get('/juros_simples', (req, res) => {
    //buscando o arquivo index.ejs na pasta views
    res.render('juros_simples');
});
app.get('/juros_compostos', (req, res) => {
    //buscando o arquivo index.ejs na pasta views
    res.render('juros_compostos');
});
const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`)
});
