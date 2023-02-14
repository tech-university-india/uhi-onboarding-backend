'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phoneNumber: {
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
        fields: ['phoneNumberId'],
        type: 'foreign key',
        name: 'custom_fkey_phoneId',
        references: { //Required field
          table: 'User_phones',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_phones');
  }
};