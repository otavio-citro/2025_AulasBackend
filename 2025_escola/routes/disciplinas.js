const express = require('express')
const rotas = express.Router();
const BD = require('../db')

rotas.get('/listar', async (req, res) => {
 const busca = req.query.busca || '';
 const order = req.query.ordem || 'nome_disciplina';
 if (busca){
    const sql = 'SELECT * FROM disciplinas WHERE ativo = true and (nome_disciplina ILIKE $1) ORDER BY nome_disciplina'
   const dados = await BD.query(sql, [`%${busca}%`]);
    return res.render('disciplinas/lista.ejs', { dadosdisciplinas: dados.rows });    
}
const dados = await BD.query ('select * from disciplinas order by nome_disciplina')
res.render('disciplinas/lista.ejs', {dadosdisciplinas: dados.rows})
});

//rota para o painel administrativo
rotas.get('/listar', async (req, res) => {
    //buscando todos os professores do banco de dados
    const dados = await BD.query(`SELECT * 
FROM disciplinas left join professores on disciplinas.id_professor = professores.id_professor
where disciplinas.ativo = true 
order by disciplinas.nome_disciplina`)
    console.log(dados.rows);
    res.render('disciplinas/lista', { dadosdisciplinas: dados.rows })
})

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