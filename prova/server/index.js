const express = require('express');
const expressFileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const URL = require('./urls/url_servidor');

const app = express();

const PORTA = 4000;

/** MySQL BANCO DE DADOS */
const db = require('./model/conexao');

/** CRIA AS TABELAS - Retire o comentário caso elas não existam */
//const tabUsuarios = require('./model/tabela_usuarios');
//const tabCarros = require('./model/tabela_carros');

/** Troca o nome public por files */
app.use('/files', express.static(path.resolve(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('enc-type', 'multipart/form-data');
    res.header('Content-Type', 'multipart/form-data');
    res.header('Content-Type', 'application/json');
    res.header('Accept', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'X-PINGOTHER, Content-Type, Authorization');
    app.use(cors());
    next();
});

app.use(expressFileUpload());

/** TABELA USUÁRIOS */

/** Salvar Usuário */
app.post('/salvar-usuario', async (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if (nome != null || email != null || senha != null) {
        try {
            const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?);";

            await db.query(sql, [nome, email, senha], (err, result) => {
                if (result) {
                    console.log('Usuário Salvo!');
                    return res.json({
                        erro: 'false',
                        mensagem: 'Usuário Salvo!'
                    });
                } else {
                    console.log('Usuário não Salvo!');
                    return res.json({
                        erro: 'true',
                        mensagem: 'Usuário não Salvo!'
                    });
                }
            });

        } catch (e) {
            console.log("Erro: " + e);
        }
    } else {
        return res.send('Campos não preenchidos!')
    }
}
);

/** Listar Usuário */
app.post('/listar', async (req, res) => {

    const emailParam = req.body.email;
    const senhaParam = req.body.senha;

    try {
        const sql = "SELECT * FROM usuarios WHERE email=? AND senha=?;";

        await db.query(sql, [emailParam, senhaParam], (err, result) => {
            if (result !== null) {
                return res.send(result);
            } else {
                return res.send({ erro: 'false' });
            }
        });
    } catch (e) {
        console.log("Erro: " + e);
    }
});

/** Atualizar Usuário por id */
app.post('/atual-usuario/:id', async (req, res) => {

    const id = req.params.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if (nome != null || email != null || senha != null) {

        try {
            const sql = "UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?;";

            await db.query(sql, [nome, email, senha, id], (err, result) => {
                if (result) {
                    return res.json({
                        erro: 'false',
                        dados: result,
                        id: id
                    });
                } else {
                    return res.send(JSON.stringify('false'));
                }
            });
        } catch (e) {
            console.log("Erro: " + e);
        }
    } else {
        return res.send('Campos não preenchidos!')
    }
});

/** Excluir Usuário por id */
app.delete('/excluir-usuario/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const sql = "DELETE FROM usuarios WHERE id=?;";

        await db.query(sql, [id], (err, result) => {
            if (result) {
                return res.send(result);
            } else {
                return res.send('Usuário não Excluído!');
            }
        });
    } catch (err) {
        return console.log('Erro: ' + err);
    }

});

/** TABELA VEICULOS */

/** Salvar Veículo */
app.post('/salvar-veiculo', async (req, res) => {

    const nome = req.body.mynome;
    const marca = req.body.mymarca;
    const modelo = req.body.mymodelo;
    const foto = req.files.myfile;
    const usuarioId = req.body.myusuario_id;

    if (nome != null || marca != null || modelo != null || foto != null || usuarioId != null) {

        const file = Date.now().toString() + '_' + foto.name;

        const filePath = path.join(__dirname, 'public', 'imagens');

        foto.mv(`${filePath}/${file}`, err => {
            if (err) {
                return console.log('Imagem não salva!');
            } else {
                return console.log('Imagem salva com sucesso!');
            }
        });


        try {

            const sql = "INSERT INTO carros (nome, marca, modelo, foto, usuario_id) VALUES (?,?,?,?,?);";

            await db.query(sql, [nome, marca, modelo, file, usuarioId], (err, result) => {
                if (result) {
                    console.log(result)
                    return res.send(result);
                } else {
                    return console.log('false');
                }
            });

        } catch (err) {
            console.log('Erro: ' + err);
        }

    } else {
        return res.send('Campos não Preenchidos!');
    }
});

/** Listar Veículos por usuário */
app.get('/listar-veiculo/:id', async (req, res) => {
    const idUsuario = req.params.id;

    try {
        if (idUsuario !== null) {
            const sql = "SELECT * FROM carros WHERE usuario_id=? ORDER BY id DESC;";

            await db.query(sql, [idUsuario], (err, result) => {
                if (result !== null) {
                    return res.send(result);
                } else {
                    res.send(JSON.stringify('false'));
                }
            });

        }
    } catch (err) {
        console.log('Erro: ' + err);
    }

});

/** Atualizar Veículo */
app.put('/atual-veiculo/:id', async (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const foto = req.files.myfile;

    if (nome != null || marca != null || modelo != null || foto != null || usuarioId != null) {

        const file = Date.now().toString() + '_' + foto.name;

        const filePath = path.join(__dirname, 'public', 'imagens');

        foto.mv(`${filePath}/${file}`, err => {
            if (err) {
                return console.log('Imagem não salva!');
            } else {
                return console.log('Imagem salva com sucesso!');
            }
        });

        try {

            const sql = "UPDATE carros SET nome=?,marca=?,modelo=?,foto=? WHERE id=?;";

            await db.query(sql, [nome, marca, modelo, file, id], (err, result) => {
                if (result) {
                    console.log(result)
                    return res.send(result);
                } else {
                    return console.log('false');
                }
            });

        } catch (err) {
            return console.log('Erro: ' + err);
        }

    } else {
        return res.send('Campos não Preenchidos!');
    }
});

/** Excluir Veículo por Id */
app.delete('/excluir-veiculo/:id', async (req, res) => {
    const id = req.params.id;

    try {

        const sql = "DELETE FROM carros WHERE id=?;";

        db.query(sql, [id], (err, result) => {
            if (result) {
                return res.send(result);
            } else {
                return res.send('Veículo não Excluído!');
            }
        });

    } catch (err) {
        return console.log('Erro: ' + err);
    }
});

/** Excluir Veículo na tela de exclusão de Usuários por Id */
app.delete('/excluir-veiculo-usuario/:id', async (req, res) => {
    const id = req.params.id;

    try {

        const sql = "DELETE FROM carros WHERE usuario_id=?;";

        db.query(sql, [id], (err, result) => {
            if (result) {
                return res.send(result);
            } else {
                return res.send('Veículo não Excluído!');
            }
        });

    } catch (err) {
        return console.log('Erro: ' + err);
    }
});

app.listen(PORTA, console.log('Servidor conectado na porta ' + PORTA + ': ' + URL));
