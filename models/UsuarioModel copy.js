const db = require('../db'); 

class Usuario {
  static async getAll() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ nome, email, senha }) {
    const result = await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $1) RETURNING *',
      [nome, email, senha]
    );
    return result.rows[0];
  }

  static async update(id, { nome, email, senha }) {
    const result = await db.query(
      'SET nome = $1, email = $2, senha = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [nome, email, senha, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Usuario;
