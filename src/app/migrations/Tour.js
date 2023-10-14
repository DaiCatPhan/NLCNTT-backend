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
      name: { type: Sequelize.STRING },
      priceAdult: { type: Sequelize.STRING },
      priceChild: { type: Sequelize.STRING },
      type: { type: Sequelize.STRING },
      duration: { type: Sequelize.STRING },
      descriptionHTML: { type: Sequelize.TEXT },
      descriptionTEXT: { type: Sequelize.TEXT },
      domain: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      vehicle: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tours");
  },
};
