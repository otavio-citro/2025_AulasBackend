const express = require('express')
const rotas = express.Router();
const BD = require('../db')

rotas.get('/listar', async (req, res) => {
    const busca = req.query.busca || '';
    const ordem = req.query.ordem || 'nome_disciplina';

    const pg = req.query.pg || 1;//variavel que controla a pag atual
    const limite = 2// qtde de registros por pagina
    const offset = (pg - 1) * limite //quantidade de registros a serem 'pulados'

    
    const dados = await BD.query(`
        SELECT *, COUNT(*) OVER() AS total_itens FROM disciplinas inner join professores on disciplinas.id_professor = professores.id_professor 
        WHERE disciplinas.ativo = true and (nome_disciplina ilike $1) 
        order by ${ordem}
        limit $2 offset $3 `,   
        ['%'+ busca + '%', limite, offset]);
    console.log(dados.rows);
    
    const totalPgs = Math.ceil(dados.rows[0].total_itens / limite); 
    res.render('disciplinas/lista', {
       dadosdisciplinas: dados.rows,
       totalPgs: totalPgs,
       pgAtual: Number(pg),
       busca: busca, 
       ordem: ordem 
    })

});

rotas.get('/novo', async (req, res) => {
    const dadosprofessores = await BD.query(
        'select id_professor, nome from professores where ativo = true order by nome'
    )


    res.render('disciplinas/novo.ejs', { dadosprofessores: dadosprofessores.rows })
})

rotas.post('/novo', async (req, res) => {
    const nome_disciplina = req.body.nome_disciplina
    const id_professor = req.body.id_professor


    // const {nome_professor, telefone, formacao} = req.body
    const sql = `insert into disciplinas (nome_disciplina, id_professor)
                    values ($1, $2)`;
    await BD.query(sql, [nome_disciplina, id_professor])
    res.redirect('/disciplinas/listar')
})

rotas.post('/excluir/:id', async (req, res) => {
    const id = req.params.id;
    // const sql = 'delete from professores where id_professor = $1'
    const sql = 'update disciplinas set ativo = false where id_disciplina = $1'
    await BD.query(sql, [id])
    res.redirect('/disciplinas/listar')
})
rotas.get('/editar/:id', async (req, res) => {
    const id = req.params.id;

    const sql = 'select * from disciplinas where id_disciplina = $1'
    const dados = await BD.query(sql, [id])

    const dadosprofessores = await BD.query(
        'select id_professor, nome from professores where ativo = true order by nome'
    )


    res.render('disciplinas/editar.ejs', { dadosdisciplinas: dados.rows[0], dadosprofessores: dadosprofessores.rows })
})
rotas.post('/editar/:id', async (req, res) => {
    const id = req.params.id
    
    const nome_disciplina = req.body.nome_disciplina;
    const id_professor = req.body.id_professor;


    // const {nome_professor, telefone, formacao} = req.body
    const sql = `update disciplinas set 
    nome_disciplina = $1,
    id_professor = $2
    where id_disciplina = $3`;
    await BD.query(sql, [nome_disciplina, id_professor, id])
    res.redirect('/disciplinas/listar')
})
module.exports = rotas