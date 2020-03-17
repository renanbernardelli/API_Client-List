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