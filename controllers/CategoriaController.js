// controllers/CategoriaController.js
const pool = require('../config/db'); // Importa a configuração do banco de dados

// Criar um usuário
exports.criarCategoria = async (req, res) => {
  const { nome_categoria } = req.body;

  const query = 'INSERT INTO categorias (nome_categoria) VALUES ($1) RETURNING *';
  const values = [nome_categoria];

  try {
    const result = await pool.query(query, values);
    const categorias = result.rows[0];
    res.status(201).json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as categorias
exports.listarCategoria = async (req, res) => {
  const query = 'SELECT * FROM categorias';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarCategoria = async (req, res) => {
  const query = 'SELECT * FROM categorias';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma categoria
exports.editarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome_categoria } = req.body;

  const query = `
    UPDATE categorias SET nome_categoria = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 RETURNING *`;
  const values = [nome_categoria, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirCategoria = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM categorias WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  criarCategoria,
  listarCategorias,
  editarCategoria,
  excluirCategoria
};
