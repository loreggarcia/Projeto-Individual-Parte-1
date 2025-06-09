const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/TasksController');

// Rotas para o CRUD de tasks
router.post('/', TasksController.criarTasks);
router.get('/', TasksController.listarTasks);
router.put('/:id', TasksController.editarTasks);
router.delete('/:id', TasksController.excluirTasks);

module.exports = router;