// routes/UsuarioRoutes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController'); // nome correto do arquivo e controller

// Rotas para o CRUD de usuários
router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuario);
router.put('/usuarios/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);

module.exports = router;
