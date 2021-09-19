const tipoConteudoInvalido = require('../errors/valorNaoSuportado')
const jsontoxml = require('jsontoxml')

class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }

    xml (dados) {
        let tag = this.tagSingular

        if (Array.isArray(dados)) {
            tag = this.tagPlural
                dados = dados.map((item) => {
                return {'Objeto' : item}
            })
        }
        return jsontoxml({ [this.tag]: dados })
    }

    serializar (dados) {

        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        if (this.contentType === 'application/xml') {
            return this.xml(dados)
        }

        throw new tipoConteudoInvalido(this.contentType)
    }

}

class SerializadorCampos extends Serializador {
    constructor (contentType) {
        super()
        this.contentType = contentType
        this.tagSingular = 'Objeto'
        this.tagPlural = 'Objetos'
    }
}

class SerializadorErro extends Serializador {
    constructor (contentType) {
        super()
        this.contentType = contentType
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorCampos: SerializadorCampos,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
}