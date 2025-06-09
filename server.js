const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota de teste básica
app.get('/', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando!', 
    timestamp: new Date().toISOString() 
  });
});

// Rota de teste de saúde
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Tasks API',
    port: port,
    env: process.env.NODE_ENV || 'development'
  });
});

// Importar rotas apenas após configurar middlewares básicos
try {
  const taskRoutes = require('./routes/TasksRoutes.js');
  app.use('/api/tasks', taskRoutes);
  console.log('✅ Rotas de tasks carregadas');
  
  // Opcional: outras rotas se existirem
  try {
    const usuarioRoutes = require('./routes/UsuarioRoutes.js');
    app.use('/api/usuarios', usuarioRoutes);
    console.log('✅ Rotas de usuários carregadas');
  } catch (err) {
    console.log('⚠️ Rotas de usuários não encontradas:', err.message);
  }
  
  try {
    const categoriaRoutes = require('./routes/CategoriaRoutes.js');
    app.use('/api/categorias', categoriaRoutes);
    console.log('✅ Rotas de categorias carregadas');
  } catch (err) {
    console.log('⚠️ Rotas de categorias não encontradas:', err.message);
  }
  
} catch (err) {
  console.error('❌ Erro ao carregar rotas:', err.message);
  console.log('⚠️ Servidor continuará sem algumas rotas...');
}

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log('🚀 =================================');
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`🚀 URL: http://localhost:${port}`);
  console.log(`🚀 Health check: http://localhost:${port}/health`);
  console.log(`🚀 Tasks API: http://localhost:${port}/api/tasks`);
  console.log('🚀 =================================');
});

// Handlers para encerramento graceful
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recebido, encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT recebido, encerrando servidor...');
  process.exit(0);
});

// Handler para erros não capturados
process.on('uncaughtException', (err) => {
  console.error('💥 Erro não capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Promise rejeitada não tratada:', reason);
  process.exit(1);
});