const Sequelize = require('sequelize')
const instancia = require('../../config/db')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    quantidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    cpfCadastro: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    ncm: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: "Produtos"
}

module.exports = instancia.define('Produtos', colunas, opcoes)