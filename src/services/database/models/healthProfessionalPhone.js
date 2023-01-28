const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConnection')
class HealthProfessionalPhone extends Model {}

HealthProfessionalPhone.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  healthProfessionalId: { type: DataTypes.INTEGER, allowNull: false },
  phoneType: { type: DataTypes.STRING, allowNull: false },
  phoneNum: { type: DataTypes.STRING, allowNull: false }

}, { sequelize })

module.exports = HealthProfessionalPhone
