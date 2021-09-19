class DadosNaoInformados extends Error{
    constructor(){
        super('Dados Não informados')
        this.name = 'dados não informados'
        this.idError = 0
    }
}

module.exports = DadosNaoInformados