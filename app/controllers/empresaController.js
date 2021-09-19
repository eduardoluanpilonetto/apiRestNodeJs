const Empresa = require('../models/empresaModel')
const Serializador = require('../Serializacao/SerializadorConteudo').SerializadorCampos

module.exports = {
    InsereEmpresa: async (req, res, next) =>{
        try{
            const dados = req.body;
            const empresa = new Empresa(dados);
            await empresa.insereEmpresa();
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar(empresa)
            ).status(200)
        }catch(erro){
           next(erro)
        }
    },
    ListaTodasEmpresas: async (req, res, next) => {
        try{
            const empresas = await Empresa.buscaTodasEmpresas();
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar(empresas)
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    AlteraEmpresa: async (req, res, next) => {
        try{
            const dadosRecebidos = req.body
            const idEmpresa = req.params.id
            const dados = Object.assign({}, dadosRecebidos, {id: idEmpresa})
            const empresa = new Empresa(dados)
            await empresa.alteraEmpresa()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({message: 'Empresa alterada com sucesso'})
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    DeletarEmpresa: async (req, res, next) => {
        try{
            const id = req.params.id
            const empresa = new Empresa({id: id})
            await empresa.DeletarEmpresa()
            const serializador = new Serializador(
                res.getHeader('Content-Type')
            )
            res.send(
                serializador.serializar({message: 'Empresa deletada com sucesso'})
            ).status(200)
        }catch(erro){
            next(erro)
        }
    },
    Options: (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
        res.header("Access-Control-Allow-Headers", "Content-Type")
        res.status(204)
    }
}