"use strict";
const { Model } = require("sequelize");
const Customer = require("../migrations/Customer");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.BookingTour, {
        sourceKey: "id",
        foreignKey: "idCustomer",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
