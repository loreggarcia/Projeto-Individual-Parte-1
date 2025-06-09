// routes/UsuarioRoutes.js
const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController.js');

// Rotas para o CRUD de categorias
router.post('/', CategoriaController.criarCategoria); 
router.get('/', CategoriaController.listarCategoria);
router.put('/:id', CategoriaController.editarCategoria);
router.delete('/:id', CategoriaController.excluirCategoria);

module.exports = router;

