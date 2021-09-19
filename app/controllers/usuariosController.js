const Usuario = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken')
const Serializador = require('../Serializacao/SerializadorConteudo').SerializadorCampos

module.exports = {
    insereUsuario: async (req, res, next) =>{
        try{
            const requisicao = req.body
            const usuario = new Usuario(requisicao) 
            await usuario.insereUsuaruio()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({usuario: usuario})
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    PegaTodosUsuarios: async (req, res, next) =>{
        try{
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar(await Usuario.pegaTodosUsuarios())
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    DeletaUsuario: async (req, res, next) =>{
        try{
            id = req.params.id
            const usuario = new Usuario({id: id}) 
            await usuario.ExcluirUsuario()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({message: 'Usuario excluido com sucesso'})
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    AlteraUsuario: async (req, res, next) =>{
        try{
            const id = req.params.id
            const dadosAtualizar = req.body
            const dados = Object.assign({}, dadosAtualizar, {id: id})
            const usuario = new Usuario(dados) 
            await usuario.AlteraUsuarios()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({message: 'Usuario alterado com sucesso'})
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    AltentificaUsuarios: async (req, res, next) => {
        try{
            const cpf = req.body.login
            const senha = req.body.senha
            const usuario = new Usuario({cpf: cpf, senha: senha}) 
            await usuario.AltentidicaUsuario()
            const token = jwt.sign({id: usuario.id, cpf: usuario.cpf},'supersenha', {expiresIn: "1h"})
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({token: token, mensagem: "Logado com sucesso"})
            ).status(200)

        }catch(erro){
            next(erro)
        }
    }
}