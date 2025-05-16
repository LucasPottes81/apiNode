const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middlewares/authMiddleware');

// Protege todas as rotas
router.use(authenticateToken);

// GET - listar todas as tarefas do usuário
router.get('/', taskController.getAllTasks);

// POST - criar nova tarefa
router.post('/', taskController.createTask);

// PUT - atualizar tarefa específica
router.put('/:id', taskController.updateTask);

// DELETE - deletar tarefa específica
router.delete('/:id', taskController.deleteTask);

module.exports = router;
