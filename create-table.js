//definindo uma constante para a String de conexão com o banco e uma constante para o objeto que vai carregar a extensão mysql
const mysql = require('mysql');
const connection = mysql.createConnection({

    host: 'XXX',
    port: 'XXX',
    user: 'XXX',
    password: 'XXX',
    database: 'XXX'
});

//usando o objeto connection para fazer uma conexão
connection.connect(err => {

    if (err) {
        
        return console.log(err);
    }

    console.log('conectou!');
    createTable(connection);
})

//executando o comando que vai criar e popular a tabela
function createTable(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS Client_List (\n"+
                "ID int NOT NULL AUTO_INCREMENT, \n"+
                "Nome varchar(150) NOT NULL, \n"+
                "CPF char(11) NOT NULL, \n"+
                "PRIMARY KEY (ID)\n"+
                ");";

    conn.query(sql, function (error, results, fields) {

        if (error) {
            
            return console.log(error);
        }
        
        console.log('criou tabela!');
        addRows(conn);
        
    })
};

//adicionando algumas linhas fazendo um bulk insert no MySQL via Node.js
function addRows(conn) {

    const sql = "INSERT INTO Client_List(Nome, CPF) VALUES ?";
    const values = [
        ['teste1', '12345678901'],
        ['teste2', '09876543210'],
        ['teste3', '12312312399']
    ]

    conn.query(sql, [values], function (error, results, fields) {

        if (error) {
            return console.log(error);
        }

        console.log('Adicionou registros!');
        conn.end(); //fecha a conexão 
    })
}