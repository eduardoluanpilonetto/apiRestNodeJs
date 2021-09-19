const Tabela = require('../tables/tableUsers')
const bcrypt = require('bcrypt')
const TabelaCnpj = require('../tables/tableCompanies')
const TabelaProduto = require('../tables/tableProducts')
const idNaoEncontrado = require('../errors/IdNaoEncontrado')
const dadosNaoInformados = require('../errors/DadosNaoInformados')
const objetoJaCadastrado = require('../errors/ObjetoJaCadastrado')
const campoInvalido  = require('../errors/campoInvalido')
const UsuarioInvalido = require('../errors/usuarioInvalido')
const atreladoOutraTabela = require('../errors/Atrelado')

class Usuário {
    constructor({id, nome, telefone, cpf, cnpj, senha, createdAt, updatedAt}){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.cpf = cpf
        this.cnpj = cnpj
        this.senha = senha
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async validaUsuário(){
        if(this.cpf !== undefined && this.cpf !== null && this.cpf.length !== 0){
            const result = await Tabela.findAll({where: {cpf: this.cpf}})
            let resultCNPJ = undefined;
            if(this.cnpj !== undefined){
                resultCNPJ = await TabelaCnpj.findAll({where: {cnpj: this.cnpj}})

            }
            var er = /^[0-9]+$/
            if(result !== undefined && result !== null && result.length !== 0){
                throw new objetoJaCadastrado()
            }
            if(er.test(this.cpf) === false){
                throw new campoInvalido('cpf')
            }
            if(this.cpf.length !== 11){
                throw new campoInvalido('cpf')
            }
            if(this.nome === undefined || typeof this.nome !== 'string'){
                throw new campoInvalido('nome')
            }
            if(this.telefone === undefined || typeof this.telefone !== 'string'){
                throw new campoInvalido('telefone')
            }
            if(this.senha === undefined || typeof this.senha !== 'string'){
                throw new campoInvalido('senha')
            }
            console.log(resultCNPJ)
            if(resultCNPJ === undefined || resultCNPJ === null || resultCNPJ.length === 0 || this.cnpj === undefined){
                throw new campoInvalido('cnpj')
            }
        }else{
            throw new campoInvalido('cpf')
        }
    }

    async insereUsuaruio(){
        await this.validaUsuário()
        this.senha = await bcrypt.hash(this.senha, 12)
        const resultado = await Tabela.create({nome: this.nome, telefone: this.telefone, senha: this.senha, cpf: this.cpf, cnpj: this.cnpj})
        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

    static async pegaTodosUsuarios(){
        return await Tabela.findAll()
    }

    async ExcluirUsuario(){
        if(this.id !== undefined && this.id !== null){
            const result = await Tabela.findOne({where: {id: this.id}})
            if(result === undefined || result === null){
                throw new idNaoEncontrado()
            }
            this.cpf = result.cpf
            const resultProduct = await TabelaProduto.findAll({where: {cpfCadastro: this.cpf}})
            if(resultProduct.length > 0){
                throw new atreladoOutraTabela('cpf', 'produtos')
            }
            await Tabela.destroy({where: {id: this.id}})
        }
    }

    async pegaUsuarioId(){
        return await Tabela.findAll({where: {id: this.id}})
    }

    async AlteraUsuarios(){
        if(this.id !== undefined && this.id !== null){
            const campos = ['nome', 'telefone', 'cpf', 'cnpj', 'senha']
            const dadosAtualizar = {}
            campos.forEach((campo) => {
            if (this[campo] !== null && this[campo] !== undefined){
                dadosAtualizar[campo] = this[campo]
            }
            })
            const result = await this.pegaUsuarioId()
            if(result.length === 0 || result === undefined || result === null){
                throw new idNaoEncontrado()
            }

            if(Object.keys(dadosAtualizar).length === 0){
                throw new dadosNaoInformados()
            }
            
            await Tabela.update(dadosAtualizar, {where: {id: this.id}})
        }
        
    }

    async AltentidicaUsuario(){
        const resultado = await Tabela.findOne({where: {cpf: this.cpf}})
        if (resultado === undefined || resultado === null){
            throw new UsuarioInvalido()
        }
        this.id = resultado.id
        const res = await bcrypt.compare(this.senha, resultado.senha)
        if (res === false){ 
            throw new UsuarioInvalido()
        }
    }
}

module.exports = Usuário