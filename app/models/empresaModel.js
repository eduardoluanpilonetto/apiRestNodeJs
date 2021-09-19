const Tabela = require('../tables/tableCompanies')
const TabelaUser = require('../tables/tableUsers')
const idNaoEncontrado = require('../errors/IdNaoEncontrado')
const dadosNaoInformados = require('../errors/DadosNaoInformados')
const objetoJaCadastrado = require('../errors/ObjetoJaCadastrado')
const campoInvalido  = require('../errors/campoInvalido')
const atreladoOutraTabela = require('../errors/Atrelado')

class Empresas{
    constructor({id, nome, telefone, cnpj, createdAt, updatedAt}){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.cnpj = cnpj,
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async ValidaEmpresaParaCadastro(){
        if(this.cnpj !== undefined && this.cnpj !== null){
            const result = await Tabela.findOne({where: {cnpj: this.cnpj}})
            var er = /^[0-9]+$/
            if(result !== null && result !== undefined && result.length !== 0){
                throw new objetoJaCadastrado()
            }
            if(er.test(this.cnpj) === false){
                throw new campoInvalido('cnpj')
            }
            if (this.cnpj.length !== 14){
                throw new campoInvalido('cnpj')
            }
            if (this.nome === undefined || this.nome == null){
                throw new campoInvalido('nome')
            }
            if (this.telefone === undefined || this.telefone == null){
                throw new campoInvalido('telefone')
            }
        }else{
            throw new campoInvalido('cnpj')
        }
    }

    async insereEmpresa(){
        await this.ValidaEmpresaParaCadastro()
        const resultado = await Tabela.create({nome: this.nome, telefone: this.telefone, cnpj: this.cnpj})
        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

    static async buscaTodasEmpresas(){
        return await Tabela.findAll();
    }

    async alteraEmpresa(){
        if(this.id !== undefined && this.id !== null){
            const campos = ['nome', 'telefone']
            let dadosParaAtualizacao = {}

            campos.forEach((campo) => {
                if(typeof this[campo] === 'string' && this[campo].length > 0){
                    dadosParaAtualizacao[campo] = this[campo]
                }
            })
            
            const result = await Tabela.findOne({where: {id: this.id}})

            if(result === null || result === undefined || result.length === 0){
                throw new idNaoEncontrado()
            }

            if(Object.keys(dadosParaAtualizacao).length === 0){
                throw new dadosNaoInformados()
            }

            await Tabela.update(dadosParaAtualizacao, {
                where: {id: this.id}
            })
        }
    }

    async DeletarEmpresa(){
        if(this.id !== undefined && this.id !== null){
            const result = await Tabela.findOne({where: {id: this.id}})
            if(result === null || result === undefined){
                throw new idNaoEncontrado()
            }
            this.cnpj = result.cnpj
            const resultUser = await TabelaUser.findAll({where: {cnpj: this.cnpj}})
            if(resultUser.length > 0){
                throw new atreladoOutraTabela('cnpj', 'usuarios')
            }
            await Tabela.destroy({
                where: {id: this.id}
            })
        }
    }
}

module.exports = Empresas