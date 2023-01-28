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
  hpr_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  salutation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middle_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_image: { type: DataTypes.STRING },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hpr_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  language_spoken: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { sequelize }
)
HealthProfessional.hasMany(HealthProfessionalPhone, { foreignKey: 'health_professional_id', sourceKey: 'id' })

module.exports = HealthProfessional
