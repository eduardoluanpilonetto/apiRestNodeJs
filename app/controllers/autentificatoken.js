const jwt = require('jsonwebtoken')
const UsuarioInvalido = require('../errors/usuarioInvalido')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const dados = jwt.verify(token, 'supersenha');
        req.usuario = dados;
        next();
    }catch(erro){
        res.status(401).send(JSON.stringify({message: 'Error!'}))
    }
}