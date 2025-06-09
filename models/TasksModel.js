const db = require('../db'); // conexão com PostgreSQL, por exemplo

class Task {
  static async getAll() {
    const result = await db.query('SELECT * FROM tasks');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria }) {
    const result = await db.query(
      'INSERT INTO tasks (titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria]
    );
    return result.rows[0];
  }

  static async update(id, { titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria }) {
    const result = await db.query(
      'SET titulo = $1, data_evento = $2, prioridade = $3 , data_criacao = $4, data_termino = $5, concluida = $6, id_usuario = $7, id_categoria = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *',
      [titulo, data_evento, prioridade, data_criacao, data_termino, concluida, id_usuario, id_categoria, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Task;
