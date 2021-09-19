const Tabela = require('../tables/tableProducts')
const idNaoEncontrado = require('../errors/IdNaoEncontrado')
const dadosNaoInformados = require('../errors/DadosNaoInformados')
const objetoJaCadastrado = require('../errors/ObjetoJaCadastrado')
const campoInvalido  = require('../errors/campoInvalido')
const TabelaUser = require('../tables/tableUsers')

class produto{
    constructor({id, nome, quantidade, cpfCadastro, ncm, createdAt, updatedAt}){
        this.id = id
        this.nome = nome
        this.quantidade = quantidade
        this.cpfCadastro = cpfCadastro
        this.ncm = ncm
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async validaProduto(){
        if(this.ncm !== undefined && this.ncm !== null && this.ncm !== 0){
            const result = await Tabela.findOne({where: {ncm: this.ncm}})
            const resultCPF = await TabelaUser.findOne({where: {cpf: this.cpfCadastro}})
            var er = /^[0-9]+$/
            if(result !== null && result !== undefined && result.length !== 0 ){
                throw new objetoJaCadastrado()
            }else if(er.test(this.ncm) === false){
                throw new campoInvalido('ncm')
            }else if(this.ncm.length > 8){
                throw new campoInvalido('ncm')
            }else if(typeof this.nome !== 'string' || this.nome === undefined){
                throw new campoInvalido('nome')
            }else if(er.test(this.quantidade) === false  || this.quantidade === undefined){
                throw new campoInvalido('quantidade')
            }else if(resultCPF === undefined || resultCPF === null){
                throw new campoInvalido('cpf')
            }
        }else{
            throw new campoInvalido('ncm')
        }
    }

    async insereProduto(){
        await this.validaProduto()
        const resultado = await Tabela.create({id: this.id, nome: this.nome, quantidade: this.quantidade, cpfCadastro: this.cpfCadastro, ncm: this.ncm})
        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

    static async listaTodosProdutos(){
        return await Tabela.findAll()
    }

    async deletarProduto(){
        if(this.id !== undefined && this.id !== null){
            const resut = await this.buscaPorId()
            if(resut === undefined || resut === null || resut.length === 0){
                throw new idNaoEncontrado()
            }
            await Tabela.destroy({where: {id: this.id}})
        }
    }

    async buscaPorId(){
        return await Tabela.findOne({where: {id:this.id}})
    }

    async alteraProduto(){
        if(this.id !== undefined && this.id !== null){
            const campos = ['nome', 'quantidade', 'ncm']
            let dadosAtualiza = {}
            campos.forEach((campo) => {
                if(this[campo] !== null && this[campo] !== undefined && this[campo].length > 0){
                    dadosAtualiza[campo] = this[campo]
                }
            })
            const resut = await this.buscaPorId()
            if(resut === undefined || resut === null || resut.length === 0){
                throw new idNaoEncontrado()
            }

            if(Object.keys(dadosAtualiza).length === 0){
                throw new dadosNaoInformados()
            }

            dadosAtualiza['cpfCadastro'] = this.cpfCadastro;

            await Tabela.update(dadosAtualiza,{where: {id: this.id}})
        }
    }
}

module.exports = produto