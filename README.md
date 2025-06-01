
# 🗂️ Task Manager API & Front-End

Este projeto é um sistema completo de gerenciamento de tarefas com autenticação de usuários, desenvolvido com Node.js no back-end, MySQL como banco de dados e um front-end básico em HTML/CSS/JavaScript. A aplicação permite que usuários autenticados criem, leiam, atualizem e excluam suas tarefas de forma segura, utilizando JWT para autenticação.

---

## 🚀 Funcionalidades

- Registro e login de usuários
- Geração de token JWT com tempo de expiração
- CRUD de tarefas (Create, Read, Update, Delete)
- Tarefas vinculadas ao usuário autenticado
- Interface front-end integrada e responsiva
- Dockerização do ambiente para facilitar a execução local
- Configuração segura com `.env` e `.env.example`


---

## 🛠️ Tecnologias Utilizadas

### Back-end
- Node.js
- Express
- Sequelize (ORM)
- MySQL
- JWT (jsonwebtoken)
- Bcryptjs
- Dotenv
- CORS

### Front-end
- HTML5
- CSS3
- JavaScript

### DevOps
- Docker
- Docker Compose

---

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Criar um arquivo `.env`

Crie um arquivo `.env` com base no `.env.example` fornecido:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=task_manager
DB_PORT=3306

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Rodar a aplicação localmente

```bash
npm start
```

---

## 🐳 Docker (Modo Recomendado)

### 1. Build e execução

```bash
docker-compose up --build
```

### 2. Parar os containers

```bash
docker-compose down
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 📬 Endpoints da API

| Método | Rota                   | Descrição                     |
|--------|------------------------|-------------------------------|
| POST   | `/auth/register`       | Cadastro de novo usuário      |
| POST   | `/auth/login`          | Login e geração de token JWT  |
| GET    | `/tasks`               | Listar tarefas de um usuário  |
| POST   | `/tasks`               | Criar nova tarefa             |
| PUT    | `/tasks/:id`           | Atualizar tarefa              |
| DELETE | `/tasks/:id`           | Deletar tarefa                |

> Todas as rotas de tarefas exigem token JWT no header: `Authorization: Bearer <token>`

---

## 🧪 Testes com Postman

Todos os testes de requisições foram feitos com a ferramenta **Postman**. A coleção de testes pode ser importada pelo arquivo `postman_collection.json` (adicione se desejar).

---

## 📁 Estrutura de Pastas

```
.
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env.example
│   ├── app.js
│   └── package.json
├── frontend/
│   └── public/
├── docker-compose.yml
└── README.md
```

---

## 🔒 Segurança

- Variáveis sensíveis estão no `.env`, que está **ignorado no Git**
- Tokens JWT criptografados e expirando após tempo definido

---

## 📚 Referências

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/)

---

## 👨‍💻 Autor

Desenvolvido por [Seu Nome].  
Entre em contato: [seu-email@example.com]
