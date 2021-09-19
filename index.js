const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const idNaoEncontrado = require('./app/errors/IdNaoEncontrado')
const dadosNaoInformados = require('./app/errors/DadosNaoInformados')
const ObjetoJaCadastrado = require('./app/errors/ObjetoJaCadastrado')
const campoInvalido  = require('./app/errors/campoInvalido')
const usuarioInvalido = require('./app/errors/usuarioInvalido')
const atreladoOutraTabela = require('./app/errors/Atrelado')
const formatoRequisicao = require('./app/errors/valorNaoSuportado')
const formatosAceitos = require('./app/Serializacao/SerializadorConteudo').formatosAceitos
const Serializador = require('./app/Serializacao/SerializadorConteudo').SerializadorCampos

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept')

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1){
        res.status(406).end()
        return
    }
    
    res.setHeader('Content-Type', formatoRequisitado)
    next()
})

const router = require('./app/routes/index')

app.use('/', router)

app.use((erro, req, res, next) => {
    let status = 500

    if (erro instanceof idNaoEncontrado) {
        status = 404
    }

    if (erro instanceof dadosNaoInformados || erro instanceof campoInvalido || erro instanceof ObjetoJaCadastrado || erro instanceof usuarioInvalido || erro instanceof atreladoOutraTabela) {
        status = 400
    }

    if (erro instanceof formatoRequisicao){
        status = 406
    }

    const serializador = new Serializador(
        res.getHeader('Content-Type')
    )
    res.status(status)
    res.send(
        serializador.serializar({
            mensagem: erro.message
        })
    )
})

app.listen(3001, () => console.log('servidor rodando na porta 3001'))