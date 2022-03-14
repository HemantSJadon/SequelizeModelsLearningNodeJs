'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('SchoolsUSA',{
      schoolName: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('SchoolsUSA');
  }
};
