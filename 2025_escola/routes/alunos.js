const express = require('express')
const rotas = express.Router();
const BD = require('../db')

rotas.get('/listar', async (req, res) => {
    const busca = req.query.busca || '';
    const ordem = req.query.ordem || 'nome';

    const pg = req.query.pg || 1;//variavel que controla a pag atual
    const limite = 2// qtde de registros por pagina
    const offset = (pg - 1) * limite //quantidade de registros a serem 'pulados'

    
    const dados = await BD.query(`
        SELECT *, COUNT(*) OVER() AS total_itens FROM alunos inner join turmas on alunos.id_turma = turmas.id_turma 
        WHERE alunos.ativo = true and (nome ilike $1) 
        order by ${ordem}
        limit $2 offset $3 `,   
        ['%'+ busca + '%', limite, offset]);
    console.log(dados.rows);
    
    const totalPgs = Math.ceil(dados.rows[0].total_itens / limite); 
    res.render('alunos/lista', {
       dadosalunos: dados.rows,
       totalPgs: totalPgs,
       pgAtual: Number(pg),
       busca: busca, 
       ordem: ordem 
    })

});

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

rotas.get('/notas/:id', async (req, res) => {
    const id = req.params.id;

    const sql = 'select * from alunos where id_aluno = $1'
    const dados = await BD.query(sql, [id])

    const dadosdisciplinas = await BD.query('select * from disciplinas where ativo = true order by nome_disciplina')


    res.render('alunos/notas.ejs', { aluno: dados.rows[0], dadosdisciplinas: dadosdisciplinas.rows })
})

rotas.post('/notas/:id', async (req, res) => {
    const id = req.params.id
    const id_disciplina = req.body.id_disciplina;
    const media = req.body.media;
    const falta = req.body.falta;
   
    let status = 'APROVADO'
    if(media < 7 || falta > 25){
        status = 'REPROVADO'
    }


    // const {nome_professor, telefone, formacao} = req.body
    const sql = `insert into aluno_disciplinas 
    (id_aluno, id_disciplina, media, nr_faltas, status)
    values ($1,$2,$3,$4,$5)`
    
    
    
    ;
    await BD.query(sql, [id, id_disciplina, media, falta,status])
    res.redirect('/alunos/listar')
})

module.exports = rotas