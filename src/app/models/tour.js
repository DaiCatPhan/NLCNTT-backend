"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       
    }
  }
  Tour.init(
    {
      nameTour: DataTypes.STRING,
      urlTour: DataTypes.STRING,
      typeTour: DataTypes.STRING,
      priceTour: DataTypes.STRING,
      contentTour: DataTypes.STRING,
      durationTour: DataTypes.STRING,
      dayStart: DataTypes.STRING,
      dayEnd: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tour",
      timestamps: false,
    }
  );
  return Tour;
};
