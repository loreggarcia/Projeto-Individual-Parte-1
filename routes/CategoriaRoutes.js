// routes/UsuarioRoutes.js
const express = require('express');
const router = express.Router();
const CategoriaModels = require('../models/CategoriaModels');
const CategoriaController = require('../controllers/CategoriaController');

// Rotas para o CRUD de categorias
router.post('/categorias', CategoriaController.criarCategoria); 
router.get('/categorias', CategoriaController.listarCategoria);
router.put('/categorias/:id', CategoriaController.editarCategoria);
router.delete('/categorias/:id', CategoriaController.excluirCategoria);

module.exports = router;

