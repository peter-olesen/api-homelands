import { sequelize } from "../config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { Users } from "./users.model.js";
import { Estates } from "./estates.model.js";

export class Favorites extends Model {}

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },

    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Estates,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "favorites",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
