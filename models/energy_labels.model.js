import { sequelize } from "../config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";

export class EnergyLabels extends Model {}

EnergyLabels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "energy_labels",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
