"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProcessTours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idTour: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      descriptionHTML: { type: Sequelize.STRING },
      descriptionTEXT: { type: Sequelize.STRING }, 

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProcessTours");
  },
};
