const Task = require('../models/taskModel');


// Função para criar uma nova tarefa
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try{
        const newTask = await Task.create({ title, description });
        res.status(201).json({
            status: 'success',
            data: {
                task: newTask,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

// Função para listar todas as tarefas
exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
  };
  
  // Função para atualizar uma tarefa
  exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
  
    try {
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
  
      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = completed || task.completed;
  
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  };
  
  // Função para deletar uma tarefa
  exports.deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
  
      await task.destroy();
      res.status(200).json({ message: `Tarefa ${id} deletada` });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
  };