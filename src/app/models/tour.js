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
      // Tour.hasMany(models.ImagesTour, {
      //   foreignKey: "tourId",
      // });
    }
  }
  Tour.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      type: DataTypes.STRING,
      duration: DataTypes.STRING,
      description: DataTypes.STRING,
      domain: DataTypes.STRING,
      image: DataTypes.STRING,
      vehicel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tour",
      timestamps: false,
    }
  );
  return Tour;
};
