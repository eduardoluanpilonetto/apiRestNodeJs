const Sequelize = require('sequelize')
const instancia = require('../../config/db')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: "Usuarios"
}

module.exports = instancia.define('Usuarios', colunas, opcoes)