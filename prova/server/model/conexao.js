const mysql = require('mysql');

const CONEXAO = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prova'
});

if(CONEXAO !== null) {
    console.log('Banco de Dados Conectado com Sucesso!');
} else {
    console.log('Erro ao conectar Banco de Dados! Verifique sua Conexão.');
}

module.exports = CONEXAO;
