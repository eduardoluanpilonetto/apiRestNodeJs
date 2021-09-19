const sequelize = require('sequelize')

const instancia = new sequelize(
    'api1',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

module.exports = instancia