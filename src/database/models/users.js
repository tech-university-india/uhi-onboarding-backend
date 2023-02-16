'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Users.hasMany(models.User_phr_address, { foreignKey: 'id' }),
      Users.hasMany(models.User_location, { foreignKey: 'id' })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    uniqueId: DataTypes.UUID,
    healthId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    emailId: DataTypes.NUMBER,
    phoneNumberId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Users',
    freezeTableName: true,
    tableName: 'Users'
  })
  return Users
}
