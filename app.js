const express = require('express');
const mysql = require('mysql2/promise');
const sequelize = require('./config/db');
const tasksRouter = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.json());

// Rota de status (teste rápido)
app.get('/', (req, res) => {
  res.send('API de Tarefas: Funcionando!');
});

// Rotas
app.use('/tasks', tasksRouter);
app.use('/', authRoutes);

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
