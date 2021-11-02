const CARROS = require('./conexao');

try {
    const sql =
        `CREATE TABLE carros(
        id int AUTO_INCREMENT,
        nome varchar(255),
        marca varchar(255),
        modelo varchar(255),
        foto varchar(255),
        PRIMARY KEY (id),
        usuario_id int,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        );`;

    const TAB_CARROS = CARROS.query(sql, (err, result) => {
        if (result === null) {
            console.log('A Tabela Carros não foi criada!');
        } else {
            console.log('A Tabela Carros foi Criada!');
        }
    });

    module.exports = TAB_CARROS;    
    
} catch (e) {
    console.log('Erro! ' + e);
}
