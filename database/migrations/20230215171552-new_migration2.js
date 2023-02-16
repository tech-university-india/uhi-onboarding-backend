'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'dateOfBirth', {
          type: Sequelize.DATEONLY
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'dateOfBirth', {
          type: Sequelize.DATE
        }, { transaction: t })
      ])
    })
  }
}
