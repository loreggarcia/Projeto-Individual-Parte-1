const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');

// Rotas para o CRUD de categorias
router.post('/', CategoriaController.criarCategoria);
router.get('/', CategoriaController.listarCategoria);
router.put('/:id_categoria', CategoriaController.editarCategoria);
router.delete('/:id_categoria', CategoriaController.excluirCategoria);

module.exports = router;
