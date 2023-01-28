const { Model, DataTypes } = require('sequelize')
const HealthProfessionalPhone = require('./healthProfessionalPhone')
const sequelize = require('../dbConnection')
class HealthProfessional extends Model {}

HealthProfessional.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  hprId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  salutation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middleName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileImage: { type: DataTypes.STRING },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hprType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  languageSpoken: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { sequelize }
)
HealthProfessional.hasMany(HealthProfessionalPhone, { foreignKey: 'healthProfessionalId', sourceKey: 'id' })

module.exports = HealthProfessional
