"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      urlTour: { type: Sequelize.STRING },
      nameTour: { type: Sequelize.STRING },
      typeTour: { type: Sequelize.STRING },
      priceTour: { type: Sequelize.STRING },
      contentTour: { type: Sequelize.STRING },
      durationTour: { type: Sequelize.STRING },
      dayStart: { type: Sequelize.DATE },
      dayEnd: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tours");
  },
};
