const { Sequelize } = require('sequelize')

const username = process.env.DBUSERNAME
const password = process.env.DBPASSWORD
const db = process.env.DBNAME
const localhost = process.env.DBHOST

const sequelize = new Sequelize(db, username, password,{
    host: localhost,
    dialect: 'mysql'
})

module.exports = sequelize