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
      Tour.hasMany(models.Calendar, {
        sourceKey: "id",
        foreignKey: "idTour",
      });

      Tour.hasOne(models.ProcessTour, {
        sourceKey: "id",
        foreignKey: "idTour",
      });
    }
  }
  Tour.init(
    {
      name: DataTypes.STRING,
      priceAdult: DataTypes.STRING,
      priceChild: DataTypes.STRING,
      type: DataTypes.STRING,
      duration: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionTEXT: DataTypes.TEXT,
      domain: DataTypes.STRING,
      image: DataTypes.STRING,
      vehicle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tour",
    }
  );
  return Tour;
};
