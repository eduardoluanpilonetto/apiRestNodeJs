class idNaoEncontrado extends Error{
    constructor(){
        super('Id não encontradoo')
        this.name = 'Id não encontrado'
        this.idError = 1
    }
}

module.exports = idNaoEncontrado