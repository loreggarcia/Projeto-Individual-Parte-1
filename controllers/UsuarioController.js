// controllers/UsuariosController.js
const pool = require('../config/db'); // Importa a configuração do banco de dados

// Criar um usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
  const values = [nome, email, senha];

  try {
    const result = await pool.query(query, values);
    const usuarios = result.rows[0];
    res.status(201).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarUsuario = async (req, res) => {
  const query = 'SELECT * FROM usuarios';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const query = `
    UPDATE usuarios SET nome = $1, email = $2, senha = $3
    WHERE id = $4 RETURNING *`;
  const values = [nome, email, senha, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    res.status(200).json({ message: 'Usuario excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
