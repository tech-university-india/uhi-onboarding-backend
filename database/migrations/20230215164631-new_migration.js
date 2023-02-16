'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'dateOfBirth', {
          type: Sequelize.DATE
        }, { transaction: t }),
        queryInterface.removeColumn('Users', 'dayOfBirth', { transaction: t }),
        queryInterface.removeColumn('Users', 'yearOfBirth', { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'dateOfBirth', {
          type: Sequelize.DATE
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'dayOfBirth', { transaction: t }),
        queryInterface.addColumn('Users', 'yearOfBirth', { transaction: t })
      ])
    })
  }
}
