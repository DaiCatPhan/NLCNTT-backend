"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Calender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Calender.init(
    {
      idTour: DataTypes.INTEGER,
      numberSeat: DataTypes.STRING,
      dayStart: DataTypes.DATE,
      dayEnd: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Calender",
    }
  );
  return Calender;
};
