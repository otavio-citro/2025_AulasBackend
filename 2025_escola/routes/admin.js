const express = require('express')
const rotas = express.Router();
const BD = require('../db')
const app = express()
//configurando a sessao da pagina
const session = require('express-session')

//rota para o painel administrativo

rotas.get('/dashboard', (req, res) => {
    res.render('admin/dashboard')
})

rotas.get('/login', (req, res) => { res.render('admin/login.ejs') })

rotas.post('/login', async (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    const sql = 'select * from usuarios where email = $1 and senha = $2'
    const dados = await BD.query(sql, [email, senha])

    if (dados.rows.length == 0){
        res.render('admin/login.ejs', { mensagem: 'email ou senha incorretos'})
    } else {
        req.session.usuario = dados.rows[0];
        res.redirect('/admin/dashboard')
    }

})


rotas.get('logout', (req, res) => {
    req.session.destroy();
    res.redirect('adimin/login')
})


module.exports = rotas