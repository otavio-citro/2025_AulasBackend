const express = require('express')
const rotas = express.Router();
const BD = require('../db')

// rotas.get('/listar', async (req, res) => {
//  const busca = req.query.busca || '';
//  const order = req.query.ordem || 'nome_professor';

//  const pg = req.query.pg || 1;//variavel que controla a pag atual
//  const limite = 10// qtde de registros por pagina
//  const offset = (pg - 1) * limite //quantidade de registros a serem 'pulados'

//  if (busca){
//      const sql = `SELECT *, count(*) over() as total_items FROM professores WHERE ativo = true and (nome ILIKE $1 or formacao ILIKE $1) ORDER BY ${ordem} limit $2 offset $3`
//      const dados = await BD.query(sql, [`%${busca}%`, limite, offset]);
//      return res.render('professores/lista.ejs', { dadosprofessores: dados.rows });    
//     }
//     // const dados = await BD.query ('select *, count(*) over() as total_items from professores order by nome limit $2 offset $3')
// res.render('professores/lista.ejs', {dadosprofessores: dados.rows})
// });
rotas.get('/listar', async (req, res) => {
    const busca = req.query.busca || '';
    const ordem = req.query.ordem || 'nome';

    const pg = req.query.pg || 1;//variavel que controla a pag atual
    const limite = 2// qtde de registros por pagina
    const offset = (pg - 1) * limite //quantidade de registros a serem 'pulados'

    
    const dados = await BD.query(`
        SELECT *, COUNT(*) OVER() AS total_itens FROM professores 
        WHERE ativo = true and (nome ilike $1 or formacao ilike $1) 
        order by ${ordem}
        limit $2 offset $3 `,   
        ['%'+ busca + '%', limite, offset]);
    console.log(dados.rows);
    
    const totalPgs = Math.ceil(dados.rows[0].total_itens / limite); 
    res.render('professores/lista', {
       dadosprofessores: dados.rows,
       totalPgs: totalPgs,
       pgAtual: Number(pg),
       busca: busca, 
       ordem: ordem 
    })

});

//rota para o painel administrativo
rotas.get('/listar', async (req, res) => {
    //buscando todos os professores do banco de dados
    const dados = await BD.query('SELECT * FROM professores where ativo = true order by nome')
    console.log(dados.rows);
    res.render('professores/lista', { dadosprofessores: dados.rows })
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