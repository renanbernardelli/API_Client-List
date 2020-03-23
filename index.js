//definindo as constantes locais
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({message: 'Funcionando!'}));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

//criar rota para listar todos os clientes do DB
function execSQLQuery(sqlQry, res) {
    
    const connection = mysql.createConnection({

        host: 'XXX',
        port: 'XXX',
        user: 'XXX',
        password: 'XXX',
        database: 'XXX'
    });

    connection.query(sqlQry, function(error, results, fields) {
        
        if (error) {
            res.json(error);
        }
        else {
            res.json(results);
        }

        connection.end();
        console.log('executou!');
    });
};

//criar rota /clients
router.get('/clients', (req, res) => {

    execSQLQuery('SELECT * FROM Client_List', res);
});

//criar rota /clients com possibilidade de buscar por id
router.get('/clients/:id?', (req, res) => {

    let filter = '';
    if (req.params.id) {
        filter = ' WHERE ID=' + parseInt(req.params.id);
    };
    execSQLQuery('SELECT * FROM Client_List' + filter, res);
});

//deletar cliente
router.delete('/clients/:id', (req, res) => {

    execSQLQuery('DELETE FROM Client_List WHERE ID=' + parseInt(req.params.id), res);
});

//Adicionar cliente
router.post('/clients', (req, res) => {

    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);
    execSQLQuery(`INSERT INTO Client_List(NOME, CPF) VALUES('${nome}', '${cpf}')`, res);
});

//Atualizar cliente com "PATCH" para não alterar o ID
router.patch('/clients/:id', (req, res) => {

    const  id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);
    execSQLQuery(`UPDATE Client_List SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
});