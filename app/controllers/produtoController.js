const Produto = require('../models/produto')
const Serializador = require('../Serializacao/SerializadorConteudo').SerializadorCampos

module.exports = {
    insereProduto: async (req, res, next) => {
        try{
            const parametros = req.body
            const produto = new Produto(parametros)
            produto.cpfCadastro = req.usuario.cpf
            await produto.insereProduto()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar(produto)
            ).status(200)
        }catch(erro){
            next(erro)
        }
    }, 
    listaTodosProdutos:  async (req, res, next) => {
        try{
            const resultado = await Produto.listaTodosProdutos()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar(resultado)
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    DeletaProduto: async (req, res, next) => {
        try{
            const id = req.params.id
            const produto = new Produto({id: id})
            await produto.deletarProduto()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({message: 'Produto exluido com sucesso'})
            ).status(200)
        }catch(erro){
            next(erro)
        }

    },
    AlteraProduto: async (req, res, next) => {
        try{
            const id = req.params.id
            const cpf = req.usuario.cpf
            const parametros = req.body
            const dados = Object.assign({}, parametros, {id: id, cpfCadastro: cpf})
            const produto = new Produto(dados)
            await produto.alteraProduto()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({message: 'Produto alterado com sucesso'})
            ).status(200)
        }catch(erro){
            next(erro)
        }
    }
}