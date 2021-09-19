class atreladoOutraTabela extends Error{
    constructor(campo, tabela){
        const messager = `O ${campo} está atrelado a tabela ${tabela}`
        super(messager)
        this.name = 'atrelado a outra tabela'
        this.idError = 4
    }
}

module.exports = atreladoOutraTabela