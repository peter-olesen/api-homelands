import express from "express";
import { sequelize } from "../config/sequelize.config.js";

export const dbController = express.Router();

dbController.get("/sync", async (req, res) => {
  try {
    // { force: true }
    const resp = await sequelize.sync();
    res.send("Server is synched");
  } catch (error) {
    console.error("Sync error", error);
    res.status(500).send(`Database Sync Error: ${error.message}`);
  }
});
