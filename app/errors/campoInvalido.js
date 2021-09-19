class CampoInvalido extends Error{
    constructor(campo){
        const messager = `O campo ${campo} não é valido, Favor verificar`
        super(messager)
        this.name = 'Campo inválido'
        this.idError = 3
    }
}

module.exports = CampoInvalido