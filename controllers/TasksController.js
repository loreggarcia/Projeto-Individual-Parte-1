const pool = require('../config/db');

// Criar uma task
const criarTasks = async (req, res) => {
  const {
    titulo,
    descricao,
    id_categoria,
    prioridade,
    data_evento,
    concluida,
    id_usuario
  } = req.body;

  const query = `
    INSERT INTO tasks (titulo, descricao, id_categoria, prioridade, data_evento, concluida, id_usuario)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [titulo, descricao, id_categoria, prioridade, data_evento, concluida || false, id_usuario];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar task:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tasks
const listarTasks = async (req, res) => {
  const query = 'SELECT * FROM tasks ORDER BY id_task DESC';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao listar tasks:', err);
    res.status(500).json({ error: err.message });
  }
};

// Editar task
const editarTasks = async (req, res) => {
  const { id_task } = req.params;
  const {
    titulo,
    descricao,
    id_categoria,
    prioridade,
    data_evento,
    concluida
  } = req.body;

  const query = `
    UPDATE tasks
    SET titulo = $1, descricao = $2, id_categoria = $3, prioridade = $4, data_evento = $5, concluida = $6
    WHERE id_task = $7
    RETURNING *
  `;
  const values = [titulo, descricao, id_categoria, prioridade, data_evento, concluida, id_task];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao editar task:', err);
    res.status(500).json({ error: err.message });
  }
};

// Excluir task
const excluirTasks = async (req, res) => {
  const { id_task } = req.params;

  const query = 'DELETE FROM tasks WHERE id_task = $1 RETURNING *';
  const values = [id_task];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task não encontrada' });
    }
    res.status(200).json({ message: 'Task excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir task:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  criarTasks,
  listarTasks,
  editarTasks,
  excluirTasks
};
