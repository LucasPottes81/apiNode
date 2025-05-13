const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET - listar tarefas
router.get('/', taskController.getAllTasks);

// POST - criar tarefa
router.post('/', taskController.createTask);

// PUT - atualizar tarefa
router.put('/:id', taskController.updateTask);

// DELETE - deletar tarefa
router.delete('/:id', taskController.deleteTask);

module.exports = router;
