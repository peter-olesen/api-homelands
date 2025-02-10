import { sequelize } from "../config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";

export class EstateImageRel extends Model {}

EstateImageRel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    is_main: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "estate_image_rel",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
