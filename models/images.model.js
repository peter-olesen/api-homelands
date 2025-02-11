import { sequelize } from "../config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { EstateImageRel } from "./estate_image_rel.model.js";

export class Images extends Model {}

Images.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: EstateImageRel,
        key: "image_id",
      },
    },

    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "images",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
