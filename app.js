const express = require('express');
const mysql = require('mysql2/promise');
const sequelize = require('./config/db');
const tasksRouter = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3000;
require('dotenv').config(); // Carrega variáveis de ambiente do .env

app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/', authRoutes);
app.get('/', (req, res) => {
  res.send('API de Tarefas: Funcionando!');
});

(async () => {
  try {
    // Conecta ao MySQL sem banco específico
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD 
    });

    // Cria o banco de dados se não existir
    await connection.query('CREATE DATABASE IF NOT EXISTS task_manager');
    console.log('Banco de dados verificado/criado com sucesso.');

    // Fecha essa conexão inicial
    await connection.end();

    // Agora sincroniza as tabelas com Sequelize (já apontando pro banco)
    await sequelize.sync({ force: true })
    console.log('Tabelas sincronizadas com sucesso.');

    // Inicia o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
  }
})();
