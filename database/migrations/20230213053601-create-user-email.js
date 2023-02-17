'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User_emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(e => {
      queryInterface.addConstraint('Users', {
        fields: ['emailId'],
        type: 'foreign key',
        name: 'custom_fkey_emailId',
        references: { // Required field
          table: 'User_emails',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User_emails')
  }
}
