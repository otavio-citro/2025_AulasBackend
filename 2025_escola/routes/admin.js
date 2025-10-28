const express =require('express')
const rotas = express.Router();

//rota para o painel administrativo

rotas.get('/dashboard', (req, res) => {
    res.render('admin/dashboard')
})

module.exports = rotas