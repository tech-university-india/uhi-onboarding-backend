'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User_email.hasMany(models.Users, { foreignKey: 'emailId' })
    }
  }
  User_email.init({
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_email',
    freezeTableName: true,
    tableName: 'User_emails'
  })
  return User_email
}
