const router = require('express').Router()
const verifica = require('../controllers/autentificatoken')
const empresaController = require('../controllers/empresaController')
const usuarioController = require('../controllers/usuariosController')
const produtoController = require('../controllers/produtoController')

/*Rotas para empresa*/
router.post('/empresas', verifica, empresaController.InsereEmpresa)
router.get('/empresas', verifica, empresaController.ListaTodasEmpresas)
router.put('/empresas/:id', verifica, empresaController.AlteraEmpresa)
router.delete('/empresas/:id', verifica, empresaController.DeletarEmpresa)
router.options('/empresas', empresaController.Options)
router.options('/empresas/:id', empresaController.Options)

/*Rotas para Usuário*/
router.post('/usuarios', verifica, usuarioController.insereUsuario)
router.get('/usuarios', verifica, usuarioController.PegaTodosUsuarios)
router.delete('/usuarios/:id', verifica, usuarioController.DeletaUsuario)
router.put('/usuarios/:id', verifica, usuarioController.AlteraUsuario)
router.options('/empresas', empresaController.Options)
router.options('/empresas/:id', empresaController.Options)
router.post('/login', usuarioController.AltentificaUsuarios)

/*Rotas para produto */
router.post('/produto', verifica, produtoController.insereProduto)
router.get('/produto', verifica, produtoController.listaTodosProdutos)
router.delete('/produto/:id', verifica, produtoController.DeletaProduto)
router.put('/produto/:id', verifica, produtoController.AlteraProduto)

module.exports = router