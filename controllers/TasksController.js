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

  console.log('Dados recebidos para criar task:', req.body);

  const query = `
    INSERT INTO tasks (titulo, descricao, id_categoria, prioridade, data_evento, concluida, id_usuario)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [titulo, descricao, id_categoria, prioridade, data_evento, concluida || false, id_usuario];

  try {
    console.log('Query de inserção:', query);
    console.log('Valores:', values);
    const result = await pool.query(query, values);
    console.log('Task criada:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar task:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tasks
const listarTasks = async (req, res) => {
  console.log('Iniciando listagem de tasks');
  const query = 'SELECT * FROM tasks ORDER BY id_task DESC';

  try {
    const result = await pool.query(query);
    console.log('Tasks encontradas:', result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao listar tasks:', err);
    res.status(500).json({ error: err.message });
  }
};

// Editar task
const editarTasks = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descricao,
    id_categoria,
    prioridade,
    data_evento,
    concluida
  } = req.body;

  console.log('Tentando editar task com ID:', id);
  console.log('Dados recebidos:', req.body);

  // Primeiro, verificar se a task existe
  try {
    const checkQuery = 'SELECT * FROM tasks WHERE id_task = $1';
    console.log('Query de verificação:', checkQuery);
    console.log('ID sendo procurado:', id);
    
    const checkResult = await pool.query(checkQuery, [id]);
    console.log('Resultado da verificação:', checkResult.rows);
    
    if (checkResult.rows.length === 0) {
      console.log('Task não encontrada no banco');
      return res.status(404).json({ message: 'Task não encontrada' });
    }

    // Se a task existe, fazer o update apenas dos campos fornecidos
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (titulo !== undefined) {
      updates.push(`titulo = $${paramCount}`);
      values.push(titulo);
      paramCount++;
    }
    if (descricao !== undefined) {
      updates.push(`descricao = $${paramCount}`);
      values.push(descricao);
      paramCount++;
    }
    if (id_categoria !== undefined) {
      updates.push(`id_categoria = $${paramCount}`);
      values.push(id_categoria);
      paramCount++;
    }
    if (prioridade !== undefined) {
      updates.push(`prioridade = $${paramCount}`);
      values.push(prioridade);
      paramCount++;
    }
    if (data_evento !== undefined) {
      updates.push(`data_evento = $${paramCount}`);
      values.push(data_evento);
      paramCount++;
    }
    if (concluida !== undefined) {
      updates.push(`concluida = $${paramCount}`);
      values.push(concluida);
      paramCount++;
    }

    values.push(id);

    const updateQuery = `
      UPDATE tasks
      SET ${updates.join(', ')}
      WHERE id_task = $${paramCount}
      RETURNING *
    `;
    
    console.log('Query de atualização:', updateQuery);
    console.log('Valores:', values);

    const result = await pool.query(updateQuery, values);
    console.log('Resultado da atualização:', result.rows);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao editar task:', err);
    res.status(500).json({ error: err.message });
  }
};

// Excluir task
const excluirTasks = async (req, res) => {
  const { id } = req.params; // Corrigido para buscar 'id' da rota

  const query = 'DELETE FROM tasks WHERE id_task = $1 RETURNING *';
  const values = [id]; // Usando 'id'

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
