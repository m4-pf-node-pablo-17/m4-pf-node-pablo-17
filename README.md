# TypeORM

Esse é o repositório da API Imami, feita com TypeORM.

## Endpoints

Existe 1 endpoint que pode ser utilizados para cadastro e 1 endpoint que pode ser usados para login.

### Cadastro

POST /login <br/>
POST /users

Esses endpoints iram logar ou cadastrar o usuário.

### Login

POST /login <br/>

Esse endpoint pode ser usado para realizar login com um dos usuários cadastrados na entity de "Users"

<h1 align="center">
  🤰 Imami - API 🤱
</h1>

<p align = "center">
Este é o backend da aplicação Imami - Feita para mães de primeira viagem, que procuram mais informação sobre o periodo pré e pós gestação, já integrando na mesma plataforma, um meio de negociar produtos, além de ter acesso e porder compartilhar informações.

<blockquote align="center">“Por que não é resposta sim!”</blockquote>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 21 endpoints - podendo cadastrar seu perfil, produtos, fazer postagens e comentários. <br/>

baseUrl da API: [<Url Base>](https://imomi.onrender.com)

## Todas rotas, exceto cadastro, necessitam de autenticação

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir visualizar produtos, postagens e comentários publicados na aplicação, ele pode postar seus produtos, publicar uma postagem e fazer comentários, editar seus dados e produtos, deletar publicação e comentário de produto.

Nessa aplicação o usuário após fazer o login ou se cadastrar pode ver usuários e lojas juntamente com seus produtos já cadastradas na plataforma, na API podemos acessar a lista dessa forma:

##
## Rota para buscar usuário e seus produtos cadastrados:

`GET products/users/userId - FORMATO DA RESPOSTA - STATUS 200`


