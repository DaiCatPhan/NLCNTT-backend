"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Staffs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      gender: { type: Sequelize.STRING },
      role: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Staffs");
  },
};
