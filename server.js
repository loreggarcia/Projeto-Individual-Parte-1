require('dotenv').config();
const { Pool } = require('pg');

// Configuração para Supabase
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Necessário para Supabase
  },
  // Configurações adicionais para estabilidade
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Aumentado para conexões remotas
});

// Eventos de monitoramento
pool.on('connect', () => {
  console.log('✅ Conectado ao Supabase PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro no pool de conexões:', err);
});

// Função para testar a conexão
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('🚀 Conexão com Supabase estabelecida com sucesso!');
    
    const result = await client.query('SELECT version()');
    console.log('📊 Versão do PostgreSQL:', result.rows[0].version.split(' ')[0] + ' ' + result.rows[0].version.split(' ')[1]);
    
    client.release();
  } catch (err) {
    console.error('💥 Erro ao conectar com Supabase:', err.message);
    
    // Dicas de troubleshooting
    if (err.code === 'ENOTFOUND') {
      console.error('🔍 Verifique se o host do Supabase está correto');
    } else if (err.code === '28P01') {
      console.error('🔐 Verifique suas credenciais (usuário/senha)');
    } else if (err.code === '3D000') {
      console.error('🗄️ Verifique se o nome do banco está correto');
    }
  }
};

// Executa teste de conexão
testConnection();

module.exports = pool;