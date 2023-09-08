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
      price: { type: Sequelize.STRING },
      type: { type: Sequelize.STRING },
      duration: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      domain: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tours");
  },
};
