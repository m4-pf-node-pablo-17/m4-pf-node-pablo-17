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

baseUrl da API: https://imomi.onrender.com

## Todas rotas, exceto cadastro, necessitam de autenticação

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir visualizar produtos, postagens e comentários publicados na aplicação, ele pode postar seus produtos, publicar uma postagem e fazer comentários, editar seus dados e produtos, deletar publicação e comentário de produto.

Nessa aplicação o usuário após fazer o login ou se cadastrar pode ver usuários e lojas juntamente com seus produtos já cadastradas na plataforma, na API podemos acessar a lista dessa forma:

##
## Rota para cadastro:

`POST /users - FORMATO DA RESPOSTA - STATUS 200`

```json
  {
    "updatedAt": "2023-01-18T19:52:01.205Z",
    "createdAt": "2023-01-18T19:52:01.205Z",
    "isActive": true,
    "isStore": false,
    "register": "fisico",
    "contact": "1234",
    "email": "ni@mail.com",
    "name": "nicolly",
    "image": "fotinha",
    "id": "2bdfb56b-cb87-4761-a13c-6152a52975d7"
  }
```
## Rota para login:

`POST products/login - FORMATO DA RESPOSTA - STATUS 200`

```json
  {
    "tokenUser": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1N0b3JlIjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTY3NDA3MTIwMiwiZXhwIjoxNjc0MTU3NjAyLCJzdWIiOiJiMTk0ZDY4NS1mYWI3LTQ4ZTMtYWRiYi03MzQ2NzljNmUxNzkifQ.QFFAVWcw3Wn9VgOwesax-Ye0-P6JjFb2Z3OeslUUCV8"
  }
```

## Rota para buscar todos usuários:

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"updatedAt": "2023-01-17T21:36:19.319Z",
		"createdAt": "2023-01-17T21:36:19.319Z",
		"isActive": true,
		"isStore": false,
		"register": "fisico",
		"contact": "1234",
		"email": "ninini@gmail.com",
		"name": "nicollyyyyyyy",
		"image": "fotinha",
		"id": "b194d685-fab7-48e3-adbb-734679c6e179"
	},
	{
		"updatedAt": "2023-01-18T19:52:01.205Z",
		"createdAt": "2023-01-18T19:52:01.205Z",
		"isActive": true,
		"isStore": false,
		"register": "fisico",
		"contact": "1234",
		"email": "ni@mail.com",
		"name": "nicolly",
		"image": "fotinha",
		"id": "2bdfb56b-cb87-4761-a13c-6152a52975d7"
	}
]
```

## Rota para buscar um usuários específico: 

`GET /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"updatedAt": "2023-01-17T21:36:19.319Z",
	"createdAt": "2023-01-17T21:36:19.319Z",
	"isActive": true,
	"isStore": false,
	"register": "fisico",
	"contact": "1234",
	"email": "ninini@gmail.com",
	"name": "nicollyyyyyyy",
	"image": "fotinha",
	"id": "b194d685-fab7-48e3-adbb-734679c6e179"
}
```

## Rota para editar o usuários logado: 

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"message": {
		"updatedAt": "2023-01-18T20:00:59.776Z",
		"createdAt": "2023-01-17T21:36:19.319Z",
		"isActive": true,
		"isStore": false,
		"register": "fisico",
		"contact": "1234",
		"email": "nicoly@mail.com",
		"name": "nicollyalves",
		"image": "fotinhaaaa",
		"id": "b194d685-fab7-48e3-adbb-734679c6e179"
	}
}
```

## Rota para deletar um usuários: 

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
  "No body returned for response"
```

## Rota para criar uma postagem: 

`POST /posts - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"title": "titulo teste3",
	"text": "texto teste3",
	"user": {
		"id": "103de9fc-d458-4b8a-a45a-da344c0e0f50",
		"image": "fotinha",
		"name": "nicollyy",
		"email": "nicoly@gmail.com",
		"contact": "1234",
		"register": "fisico",
		"isStore": false,
		"isActive": true,
		"createdAt": "2023-01-18T20:35:40.572Z",
		"updatedAt": "2023-01-18T20:35:40.572Z"
	},
	"image": null,
	"deletedAt": null,
	"id": "421d8a95-82af-44db-8d6b-db78f45137f0",
	"createdAt": "2023-01-18T20:52:16.732Z",
	"updatedAt": "2023-01-18T20:52:16.732Z"
}
```

## Rota para buscar todas postagens: 

`GET /posts - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "54559ecf-0189-4c50-b98a-aa7df6d47186",
		"image": null,
		"title": "titulo teste1",
		"text": "texto teste1",
		"createdAt": "2023-01-18T20:51:56.532Z",
		"updatedAt": "2023-01-18T20:51:56.532Z",
		"deletedAt": null
	},
	{
		"id": "75d44400-4728-4dd0-bfb3-c3320bb6e028",
		"image": null,
		"title": "titulo teste2",
		"text": "texto teste2",
		"createdAt": "2023-01-18T20:52:09.497Z",
		"updatedAt": "2023-01-18T20:52:09.497Z",
		"deletedAt": null
	},
	{
		"id": "421d8a95-82af-44db-8d6b-db78f45137f0",
		"image": null,
		"title": "titulo teste3",
		"text": "texto teste3",
		"createdAt": "2023-01-18T20:52:16.732Z",
		"updatedAt": "2023-01-18T20:52:16.732Z",
		"deletedAt": null
	}
]
```

## Rota para buscar uma postagem pelo id: 

`GET /posts/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "75d44400-4728-4dd0-bfb3-c3320bb6e028",
	"image": null,
	"title": "titulo teste2",
	"text": "texto teste2",
	"createdAt": "2023-01-18T20:52:09.497Z",
	"updatedAt": "2023-01-18T20:52:09.497Z",
	"deletedAt": null
}
```

## Rota para editar uma postagem: 

`PATCH /posts/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "75d44400-4728-4dd0-bfb3-c3320bb6e028",
	"image": null,
	"title": "titulo teste2",
	"text": "texto teste2",
	"createdAt": "2023-01-18T20:52:09.497Z",
	"updatedAt": "2023-01-18T20:52:09.497Z",
	"deletedAt": null
}
```

## Rota para deletar uma postagem: 

`DELETE /posts/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
  "No body returned for response"
```



