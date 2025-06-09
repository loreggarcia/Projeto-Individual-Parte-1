// routes/UsuarioRoutes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController'); // nome correto do arquivo e controller

// Rotas para o CRUD de usuários
router.post('/', UsuarioController.criarUsuario);
router.get('/', UsuarioController.listarUsuario);
router.put('/:id', UsuarioController.editarUsuario);
router.delete('/:id', UsuarioController.excluirUsuario);

module.exports = router;
