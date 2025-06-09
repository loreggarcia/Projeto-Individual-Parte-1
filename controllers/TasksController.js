const pool = require('../config/db'); // Importa a configuração do banco de dados

// Criar uma task
const criarTasks = async (req, res) => {
  const {
    title,
    description,
    category,
    priority,
    date,
    completed,
    createdAt
  } = req.body;

  const query = 'INSERT INTO tasks (title, description, category, priority, date, completed, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [title, description, category, priority, date, completed, createdAt];

  try {
    const result = await pool.query(query, values);
    const task = result.rows[0];
    res.status(201).json(task);
  } catch (err) {
    console.error('Erro ao criar task:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tasks
const listarTasks = async (req, res) => {
  const query = 'SELECT * FROM tasks ORDER BY created_at DESC';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao listar tasks:', err);
    res.status(500).json({ error: err.message });
  }
};

// Editar tasks
const editarTasks = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, priority, date, completed } = req.body;

  const query = `UPDATE tasks SET title = $1, description = $2, category = $3, priority = $4, date = $5, completed = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *`;
  const values = [title, description, category, priority, date, completed, id];

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

// Excluir uma tarefa
const excluirTasks = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
  const values = [id];

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

// Exportação
module.exports = {
  criarTasks,
  listarTasks,
  editarTasks,
  excluirTasks
};