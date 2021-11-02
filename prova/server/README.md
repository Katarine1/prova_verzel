
<h1>Instalaçõs de pacotes:</h1>

<h3>1) Express:</h3>
### npm install --save express

<h3>2) MySql Banco de Dados:</h3>
### npm install --save mysql

<h3>3) Cors:</h3>
### npm install --save cors

<h3>4) Express File Upload:</h3>
### npm install --save express-fileupload


<h3>5) Importante:</h3> 
<h4>5.1) Criar uma Base de Dados no Banco de dados MySql chamada de "prova".</h4>
<h4>5.2) O Sistema de Banco de dados utilizado foi o phpMyAdmin.</h4>
<h4>5.3) Para realizar a conexão foi utilizado o XAMPP ( https://www.apachefriends.org/pt_br/index.html ).</h4>


<h3>6) Abra o Arquivo ./server/index.js :</h3>

<h3>6.1) Importes: (Retirar Comentários de "tabUsuarios" e "tabCarros")</h3>

<h4>/** CRIA AS TABELAS - Retire o comentário caso elas não existam */<br/>
const tabUsuarios = require('./model/tabela_usuarios');<br/>
const tabCarros = require('./model/tabela_carros');</h4>

<h3>6.2) Após executar a inicialização do servidor, essas tabelas serão criadas.</h3>

<h3>6.3) Executar o servidor Node Js após a a retirada dos comentários no item 6.1:</h3>
### node index.js

<h3>6.3) Desconectar Servidor Node Js:</h3>
### ctrl + C

<h3>6.4) Importes: (Colocar Comentários de "tabUsuarios" e "tabCarros")</h3>

<h4>/** CRIA AS TABELAS - Retire o comentário caso elas não existam */<br/>
//const tabUsuarios = require('./model/tabela_usuarios');<br/>
//const tabCarros = require('./model/tabela_carros');</h4>


<h2>Casos Importantes:</h2>

<h4>Importante : Instalar pacotes para ter todas as dependências:</h4>
### npm Install

<h4>Importante : Caso ocorra algum erro, reinstalar pacotes:</h4>
### npm Install

<h4>Executar Servidor Antes de executar o app:</h4>
### node index.js
