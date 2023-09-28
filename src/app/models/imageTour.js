"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImagesTour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ImagesTour.belongsTo(models.Tour , {
        foreignKey: 'tourId',
        
      });
    }
  }
  ImagesTour.init(
    {
      url: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      tourId: {
        primaryKey: true,
        type: DataTypes.INTERGER,
      },
    },
    {
      sequelize,
      modelName: "ImagesTour",
      timestamps: false,
    }
  );
  return ImagesTour;
};
