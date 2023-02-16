'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'profilePhoto', {
          type: Sequelize.STRING(10000)
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'profilePhoto', {
          type: Sequelize.STRING
        }, { transaction: t })
      ])
    })
  }
}
