class ValorNaoSuportado extends Error{
    constructor(contentType){
        super(`O tipo de conteúdo ${contentType} é invalido`)
        this.name = 'Tipo de conteúdo invalido'
        this.idError = 5
    }
}

module.exports = ValorNaoSuportado