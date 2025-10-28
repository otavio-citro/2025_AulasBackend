const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//rota da pagina principal "landing page"
app.get('/', (req, res) =>{
    res.render('landing/index')
});

//importando as rotas do admin
const adminRotas = require('./routes/admin');
app.use('/admin', adminRotas)
//importando as rotas de professores
const professoresRotas = require('./routes/professores.js');
app.use('/professores', professoresRotas)
//importando as rotas de turmas
const turmasRotas = require('./routes/turmas.js');
app.use('/turmas', turmasRotas)

const disciplinasRotas = require('./routes/disciplinas.js');
app.use('/disciplinas', disciplinasRotas)

const alunosRotas = require('./routes/alunos.js');
app.use('/alunos', alunosRotas)


const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`)
});