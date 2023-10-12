"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RegistrationTours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idCalender: { type: Sequelize.INTEGER },
      idCustomer: { type: Sequelize.INTEGER },
      idStaff: { type: Sequelize.INTEGER },
      numberTicket: { type: Sequelize.STRING },
      money: { type: Sequelize.STRING },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RegistrationTours");
  },
};
