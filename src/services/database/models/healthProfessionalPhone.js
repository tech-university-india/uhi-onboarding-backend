const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConnection')
class HealthProfessionalPhone extends Model {}

HealthProfessionalPhone.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  health_professional_id: { type: DataTypes.INTEGER, allowNull: false },
  phone_type: { type: DataTypes.STRING, allowNull: false },
  phone_num: { type: DataTypes.STRING, allowNull: false }

}, { sequelize })

module.exports = HealthProfessionalPhone
