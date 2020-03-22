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
})