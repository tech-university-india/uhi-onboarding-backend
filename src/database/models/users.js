const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConnection/dbConnection')
class Users extends Model { }
Users.init({
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
    salutation: {
        type: DataTypes.INTEGER
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
    lastname: {
        type: DataTypes.STRING
      },
    aadharNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Users.sync({ force: true })
  .then(() =>
    console.log('Successfully Synchornized the Database with Patient table')
  )
  .catch(console.log)
module.exports = { Users }