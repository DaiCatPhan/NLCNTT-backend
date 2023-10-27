"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Calendars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idTour: { type: Sequelize.INTEGER },
      numberSeat: { type: Sequelize.STRING },
      priceAdult: { type: Sequelize.STRING },
      priceChild: { type: Sequelize.STRING },
      startDay: { type: Sequelize.DATE },
      endDay: { type: Sequelize.DATE }, 

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Calendars");
  },
};
