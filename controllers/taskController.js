const Task = require('../models/taskModel');

// GET - listar tarefas do usuário autenticado
async function getAllTasks(req, res) {
  const userId = req.user.id;

  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
}

// POST - criar tarefa
async function createTask(req, res) {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
}
// PUT - atualizar tarefa do usuário
async function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado' });
    }
    await task.update({ title, description, completed });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
}

// DELETE - excluir tarefa do usuário
async function deleteTask(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado' });
    }
    await task.destroy();
    res.json({ message: 'Tarefa excluída' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
}

// Exporte todas as funções
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};