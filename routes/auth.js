const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
});

// Login com JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Senha inválida' });

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
