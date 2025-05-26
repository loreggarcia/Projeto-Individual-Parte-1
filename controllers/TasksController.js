// controllers/tasksController.js
const pool = require('../config/db'); // Importa a configuração do banco de dados

// Criar uma task
exports.criarTasks = async (req, res) => {
  const {
    titulo,
    data_evento,
    prioridade,
    data_criacao,
    data_termino,
    concluida,
    id_usuario,
    id_categoria} = req.body;

  const query = 'INSERT INTO usuarios (titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const values = [titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria];

  try {
    const result = await pool.query(query, values);
    const tasks = result.rows[0];
    res.status(201).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tasks
exports.listarTasks = async (req, res) => {
  const query = 'SELECT * FROM tasks';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar tasks
exports.editarTasks = async (req, res) => {
  const { id } = req.params;
  const { titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria } = req.body;

  const query = `UPDATE tasks SET titulo = $1, data_evento = $2, prioridade = $3 , data_criacao = $4, data_termino = $5, concluida = $6, id_usuario = $7, id_categoria = $8, updated_at = CURRENT_TIMESTAMP
    WHERE id = $9 RETURNING *`;
  const values = [titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTasks = async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  criarTasks,
  listarTasks, 
  editarTasks, 
  excluirTasks
};