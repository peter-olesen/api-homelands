import { sequelize } from "../config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { Cities } from "./cities.model.js";
import { EstateTypes } from "./estate_types.model.js";
import { EnergyLabels } from "./energy_labels.model.js";

export class Estates extends Model {}

Estates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    payout: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    gross: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    net: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    num_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    num_floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    floor_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ground_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    basement_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    year_of_construction: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    year_rebuilt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    floorplan: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    num_clicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cities,
        key: "id",
      },
    },

    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: EstateTypes,
        key: "id",
      },
    },

    energy_label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EnergyLabels,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "estates",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
