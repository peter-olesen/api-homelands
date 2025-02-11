import { sequelize } from "../config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { Favorites } from "./favorites.model.js";
import { Reviews } from "./reviews.model.js";

export class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Favorites,
        key: "user_id",
      },
      references: {
        model: Reviews,
        key: "user_id",
      },
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
      beforeCreate: async (Users, options) => {
        Users.password = await createHash(Users.password);
      },
      beforeUpdate: async (Users, options) => {
        if (Users.changed("password")) {
          Users.password = await createHash(Users.password);
        }
      },
    },
  }
);

const createHash = async (string) => {
  try {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(string, salt);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};
