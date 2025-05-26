// routes/TasksRoutes.js
const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/CategoriaModels');

// Rotas para o CRUD de categorias
router.post('/tasks', TasksController.criarTasks);                                                                                  
router.get('/tasks', TasksController.listarTasks);
router.put('/tasks/:id', TasksController.editarTasks);
router.delete('/tasks/:id', TasksController.excluirTasks);

module.exports = router;