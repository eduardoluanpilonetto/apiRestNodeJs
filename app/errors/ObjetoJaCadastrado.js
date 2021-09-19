class ObjetoJaCadastrado extends Error{
    constructor(){
        super('Objeto já cadastrado')
        this.name = 'Objeto já cadastrado'
        this.idError = 2
    }
}

module.exports = ObjetoJaCadastrado