const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const session = require('express-session');
const { log } = require('console');
app.use(session({
    secret: 'sesisenai',
    resave: false,
    saveUninitialized: false
}))

const  verificarAutenticacao = (req, res, next) => {
    if (req.session.usuario) {
        res.locals.usuario = req,session.usuario || null;
        next();
    } else {
    res.redirect('/admin/login')
    }
    
}

//rota da pagina principal "landing page"
app.get('/', (req, res) =>{
    res.render('landing/index')
});

app.get('/dashboard', verificarAutenticacao,(req, res) => {
    res.render('admin/dashboard')
})

//importando as rotas do admin
const adminRotas = require('./routes/admin');
app.use('/admin',  adminRotas)
//importando as rotas de professores
const professoresRotas = require('./routes/professores.js');
app.use('/professores', verificarAutenticacao, professoresRotas)
//importando as rotas de turmas
const turmasRotas = require('./routes/turmas.js');
app.use('/turmas', verificarAutenticacao, turmasRotas)

const disciplinasRotas = require('./routes/disciplinas.js');
app.use('/disciplinas', verificarAutenticacao, disciplinasRotas)

const alunosRotas = require('./routes/alunos.js');
app.use('/alunos',  alunosRotas)
//configurando a sessao da pagina


const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`)
});