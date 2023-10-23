"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookingTours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idCalendar: { type: Sequelize.INTEGER },
      idCustomer: { type: Sequelize.INTEGER },
      numberTicketAdult: { type: Sequelize.STRING },
      numberTicketChild: { type: Sequelize.STRING },
      money: { type: Sequelize.STRING },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookingTours");
  },
};
