"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RegistrationTour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RegistrationTour.belongsTo(models.Calender, {
        foreignKey: "idCalendar",
        targetKey: "id",
      });
      RegistrationTour.belongsTo(models.Customer, {
        foreignKey: "idCustomer",
        targetKey: "id",
      });
      RegistrationTour.belongsTo(models.Staff, {
        foreignKey: "idStaff",
        targetKey: "id",
      }); 
    }
  }
  RegistrationTour.init(
    {
      idCustomer: DataTypes.INTEGER,
      idCalendar: DataTypes.INTEGER,
      idStaff: DataTypes.INTEGER,
      numberTicket: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RegistrationTour",
    }
  );
  return RegistrationTour;
};
