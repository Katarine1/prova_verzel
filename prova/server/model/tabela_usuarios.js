const USUARIOS = require('./conexao');

try {
    const sql =
        `CREATE TABLE usuarios(
    id int AUTO_INCREMENT,
    nome varchar(255),
    email varchar(255),
    senha varchar(255),
    PRIMARY KEY (id)
    );`;

    const TAB_USUARIOS = USUARIOS.query(sql, (err, result) => {
        if (result === null) {
            console.log('A Tabela Usuários não foi criada!');
        } else {
            console.log('A Tabela Usuários foi Criada!');
        }
    });

    module.exports = TAB_USUARIOS;
       
} catch (e) {
    console.log('Erro! '+ e);
}
