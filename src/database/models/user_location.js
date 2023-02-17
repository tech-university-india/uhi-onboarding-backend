'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User_location.belongsTo(models.Users, { foreignKey: 'user_id' })
    }
  }
  User_location.init({
    userId: DataTypes.NUMBER,
    address: DataTypes.STRING,
    stateCode: DataTypes.STRING,
    districtCode: DataTypes.STRING,
    subDistrictCode: DataTypes.STRING,
    pinCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_location',
    freezeTableName: true,
    tableName: 'User_locations'
  })
  return User_location
}
