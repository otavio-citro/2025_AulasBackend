const express = require('express')
const rotas = express.Router();
const BD = require('../db')

//rota para o painel administrativo
rotas.get('/listar', async (req, res) => {
    //buscando todos os professores do banco de dados
    const dados = await BD.query('SELECT * FROM turmas where ativo = true order by nome_turma')
    console.log(dados.rows);
    res.render('turmas/lista', { dadosturmas: dados.rows })
})

rotas.get('/novo', async (req, res) => {
    res.render('turmas/novo.ejs')
})

rotas.post('/novo', async (req, res) => {
    const nome_turma = req.body.nome_turma

    // const {nome_professor, telefone, formacao} = req.body
    const sql = `insert into turmas (nome_turma)
                    values ($1)`;
    await BD.query(sql, [nome_turma])
    res.redirect('/turmas/listar')
})
rotas.post('/excluir/:id', async (req, res) => {
    const id = req.params.id;

    // const sql = 'delete from turmas where id_turma = $1'
    //a melhor pratica é desativar o item e nao excluir
    const sql = 'update  turmas set ativo = false where id_turma = $1'
    await BD.query(sql, [id])
    res.redirect('/turmas/listar')
})
rotas.get('/editar/:id', async (req, res) => {
    const id = req.params.id;

    const sql = 'select * from turmas where id_turma = $1'
    const dados = await BD.query(sql, [id])


    res.render('turmas/editar.ejs', { dadosturmas: dados.rows[0] })
})
rotas.post('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const nome_turma = req.body.nome_turma;

    const sql = `update turmas set 
    nome_turma = $1
    where id_turma = $2`;
    await BD.query(sql, [nome_turma, id])
    res.redirect('/professores/listar')
})
module.exports = rotas
