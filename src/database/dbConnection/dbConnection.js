const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'postgres'
  }
)
module.exports = sequelize
