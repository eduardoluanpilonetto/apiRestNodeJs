class usuarioInvalido extends Error{
    constructor(){
        super('Campo de login ou senha invalidos, favor verificar!')
        this.name = 'Falha ao logar'
        this.idError = 4
    }
}

module.exports = usuarioInvalido
