"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Calendar.belongsTo(models.Tour, {
        foreignKey: "idTour",
        targetKey: "id",
      });

      Calendar.hasMany(models.BookingTour, {
        foreignKey: "idCalendar",
        sourceKey: "id",
      });
    }
  }
  Calendar.init(
    {
      idTour: DataTypes.INTEGER,
      numberSeat: DataTypes.STRING,
      startDay: DataTypes.STRING,
      endDay: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Calendar",
    }
  );
  return Calendar;
};
