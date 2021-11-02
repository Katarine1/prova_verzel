
Instalaçõs de pacotes:

1) Express:
### npm install --save express

2) MySql Banco de Dados:
### npm install --save mysql

3) Cors:
### npm install --save cors

4) Express File Upload:
### npm install --save express-fileupload


5) Importante: 
5.1) Criar uma Base de Dados no Banco de dados MySql chamada de "prova".
5.2) O Sistema de Banco de dados utilizado foi o phpMyAdmin.
5.3) Para realizar a conexão foi utilizado o XAMPP ( https://www.apachefriends.org/pt_br/index.html ).


6) Abra o Arquivo ./server/index.js :

6.1) Importes: (Retirar Comentários de "tabUsuarios" e "tabCarros")

/** CRIA AS TABELAS - Retire o comentário caso elas não existam */
const tabUsuarios = require('./model/tabela_usuarios');
const tabCarros = require('./model/tabela_carros');

6.2) Após executar a inicialização do servidor, essas tabelas serão criadas.

6.3) Executar o servidor Node Js após a a retirada dos comentários no item 6.1:
### node index.js

6.3) Desconectar Servidor Node Js:
### ctrl + C

6.4) Importes: (Colocar Comentários de "tabUsuarios" e "tabCarros")

/** CRIA AS TABELAS - Retire o comentário caso elas não existam */
//const tabUsuarios = require('./model/tabela_usuarios');
//const tabCarros = require('./model/tabela_carros');


Casos Importantes:

Importante : Instalar pacotes para ter todas as dependências:
### npm Install

Importante : Caso ocorra algum erro, reinstalar pacotes:
### npm Install

Executar Servidor Antes de executar o app:
### node index.js
