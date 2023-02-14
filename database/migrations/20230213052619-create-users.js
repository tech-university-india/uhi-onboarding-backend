'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      uniqueId: {
        type: Sequelize.UUID
      },
      healthId: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dayOfBirth: {
        type: Sequelize.STRING
      },
      yearOfBirth: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      profilePhoto: {
        type: Sequelize.STRING
      },
      emailId: {
        type: Sequelize.INTEGER,
    //    references: {model:'User_email', key:'id'},
      },
      phoneNumberId: {
        type: Sequelize.INTEGER,
      //  references: {model:'User_phone', key:'id'},
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};