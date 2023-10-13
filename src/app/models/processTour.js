"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProcessTour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProcessTour.belongsTo(models.Tour, {
        foreignKey: "idTour",
        targetKey: "id",
      });
    }
  }
  ProcessTour.init(
    {
      idTour: DataTypes.INTEGER,
      name: DataTypes.STRING,
      descriptionHTML: DataTypes.STRING,
      descriptionTEXT: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProcessTour",
    }
  );
  return ProcessTour;
};
