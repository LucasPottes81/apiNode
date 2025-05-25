const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const sequelize = require('./config/db');
const tasksRouter = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do front-end (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public', 'front-Task-List')));

// Rota de status (teste rápido)
app.get('/', (req, res) => {
  res.send('API de Tarefas: Funcionando!');
});

// Rotas
app.use('/tasks', tasksRouter);
app.use('/', authRoutes);

// Página principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

(async () => {
  try {
    // Conexão temporária para criar o banco, se necessário
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS task_manager');
    console.log('Banco de dados verificado/criado com sucesso.');
    await connection.end();

    // Sincroniza modelos (sem forçar exclusão)
    await sequelize.sync();
    console.log('Tabelas sincronizadas com sucesso.');

    // Inicia o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
  }
})();
