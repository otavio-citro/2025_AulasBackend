const express = require('express')
const rotas = express.Router();
const BD = require('../db')

//rota para o painel administrativo
rotas.get('/listar', async (req, res) => {
    //buscando todos os professores do banco de dados
    const dados = await BD.query(`SELECT * 
FROM alunos left join turmas on alunos.id_turma = turmas.id_turma
where alunos.ativo = true 
order by alunos.nome`)
    console.log(dados.rows);
    res.render('alunos/lista', { dadosalunos: dados.rows })
})

rotas.get('/novo', async (req, res) => {
    res.render('professores/novo.ejs')
})

rotas.post('/novo', async (req, res) => {
    const nome_professor = req.body.nome_professor
    const telefone = req.body.telefone
    const formação = req.body.formacao

    // const {nome_professor, telefone, formacao} = req.body
    const sql = `insert into professores (nome, telefone, formacao)
                    values ($1, $2, $3)`;
    await BD.query(sql, [nome_professor, telefone, formação])
    res.redirect('/professores/listar')
})

rotas.post('/excluir/:id', async (req, res) => {
    const id = req.params.id;
    // const sql = 'delete from professores where id_professor = $1'
    const sql = 'update professores set ativo = false where id_professor = $1'
    await BD.query(sql, [id])
    res.redirect('/professores/listar')
})
rotas.get('/editar/:id', async (req, res) => {
    const id = req.params.id;

    const sql = 'select * from professores where id_professor = $1'
    const dados = await BD.query(sql, [id])


    res.render('professores/editar.ejs', { professor: dados.rows[0] })
})
rotas.post('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const nome_professor = req.body.nome_professor;
    const telefone = req.body.telefone;
    const formação = req.body.formacao;

    // const {nome_professor, telefone, formacao} = req.body
    const sql = `update professores set 
    nome = $1,
    telefone = $2,
    formacao = $3
    where id_professor = $4`;
    await BD.query(sql, [nome_professor, telefone, formação, id])
    res.redirect('/professores/listar')
})
module.exports = rotas