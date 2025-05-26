const db = require('../db'); 

class Categorias {
  static async getAll() {
    const result = await db.query('SELECT * FROM categorias');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM categorias WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ nome_categoria }) {
    const result = await db.query(
      'INSERT INTO categorias (nome_categoria) VALUES ($1) RETURNING *',
      [nome_categoria]
    );
    return result.rows[0];
  }

  static async update(id, { nome_categoria }) {
    const result = await db.query(
      'SET nome_categoria = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [nome_categoria, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Categorias;
