'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User_phone.hasMany(models.Users, { foreignKey: 'phoneNumberId' })
    }
  }
  User_phone.init({
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_phone',
    // freezeTableName: true,
    tableName: 'User_phones'
  })
  return User_phone
}
