const express = require('express')
const rotas = express.Router();
const BD = require('../db')

rotas.get('/listar', async (req, res) => {
 const busca = req.query.busca || '';
 const order = req.query.ordem || 'nome';
 if (busca){
    const sql = 'SELECT * FROM alunos WHERE ativo = true and (nome ILIKE $1) ORDER BY nome'
   const dados = await BD.query(sql, [`%${busca}%`]);
    return res.render('alunos/lista.ejs', { dadosalunos: dados.rows });    
}
const dados = await BD.query ('select * from alunos order by nome')
res.render('alunos/lista.ejs', {dadosalunos: dados.rows})
});

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
    const dadosturma = await BD.query(
        'select id_turma, nome_turma from turmas where ativo = true order by nome_turma'
    )


    res.render('alunos/novo.ejs', { dadosturma: dadosturma.rows })
})

rotas.post('/novo', async (req, res) => {
    const nome = req.body.nome
    const idade = req.body.idade
    const email = req.body.sexo
    const cpf = req.body.cpf
    const foto = req.body.foto
    const sexo = req.body.sexo
    const id_turma = req.body.id_turma


    // const {nome_professor, telefone, formacao} = req.body
    const sql = `insert into alunos (nome, idade, email, cpf, foto, sexo, id_turma)
                    values ($1, $2, $3, $4, $5, $6, $7)`;
    await BD.query(sql, [nome, idade, email, cpf, foto, sexo, id_turma])
    res.redirect('/alunos/listar')
})

rotas.post('/excluir/:id', async (req, res) => {
    const id = req.params.id;
    // const sql = 'delete from professores where id_professor = $1'
    const sql = 'update alunos set ativo = false where id_aluno = $1';
    await BD.query(sql, [id]);
    res.redirect('/alunos/listar');
})
rotas.get('/editar/:id', async (req, res) => {
    const id = req.params.id;

    const sql = 'select * from alunos where id_aluno = $1'
    const dados = await BD.query(sql, [id])

    const dadosturma = await BD.query(
        'select id_turma, nome_turma from turmas where ativo = true order by nome_turma'
    )


    res.render('alunos/editar.ejs', { dadosalunos: dados.rows[0], dadosturma: dadosturma.rows })
})
rotas.post('/editar/:id', async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome;
    const idade = req.body.idade;
    const sexo = req.body.sexo;
    const id_turma = req.body.id_turma;


    // const {nome_professor, telefone, formacao} = req.body
    const sql = `update alunos set 
    nome = $1,
    idade = $2,
    sexo = $3,
    id_turma = $4
    where id_aluno = $5`;
    await BD.query(sql, [nome, idade, sexo, id_turma, id])
    res.redirect('/alunos/listar')
})
module.exports = rotas