const pool = require('../config/db');

// Criar uma categoria
const criarCategoria = async (req, res) => {
  const { nome_categoria } = req.body;
  const query = 'INSERT INTO categorias (nome_categoria) VALUES ($1) RETURNING *';
  const values = [nome_categoria];
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as categorias
const listarCategoria = async (req, res) => {
  const query = 'SELECT * FROM categorias';
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma categoria
const editarCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const { nome_categoria } = req.body;
  const query = `
    UPDATE categorias SET nome_categoria = $1
    WHERE id_categoria = $2 RETURNING *`;
  const values = [nome_categoria, id_categoria];
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma categoria
const excluirCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const query = 'DELETE FROM categorias WHERE id_categoria = $1 RETURNING *';
  const values = [id_categoria];
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
  listarCategoria,
  editarCategoria,
  excluirCategoria
};
