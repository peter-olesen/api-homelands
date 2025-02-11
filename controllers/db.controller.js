import express from "express";
import { sequelize } from "../config/sequelize.config.js";
import { seedFromCsv } from "../utils/seedUtils.js";
import { Cities } from "../models/cities.model.js";
import { EnergyLabels } from "../models/energy_labels.model.js";
import { EstateImageRel } from "../models/estate_image_rel.model.js";
import { EstateTypes } from "../models/estate_types.model.js";
import { Estates } from "../models/estates.model.js";
import { Favorites } from "../models/favorites.model.js";
import { Images } from "../models/images.model.js";
import { Reviews } from "../models/reviews.model.js";
import { Staffs } from "../models/staffs.model.js";
import { Users } from "../models/users.model.js";

export const dbController = express.Router();

dbController.get("/sync", async (req, res) => {
  try {
    // { force: true }
    const resp = await sequelize.sync({ force: true });
    res.send("Server is synched");
  } catch (error) {
    console.error("Sync error", error);
    res.status(500).send(`Database Sync Error: ${error.message}`);
  }
});

// Seed database fra CSV filer
dbController.get("/seedfromcsv", async (req, res) => {
  try {
    // Indsæt data fra CSV filer til de respektive modeller
    await seedFromCsv("./city.csv", Cities);
    await seedFromCsv("./energy-label.csv", EnergyLabels);
    await seedFromCsv("./estate-image-rel.csv", EstateImageRel);
    await seedFromCsv("./estate-type.csv", EstateTypes);
    // await seedFromCsv("./estate.csv", Estates);
    await seedFromCsv("./favorite.csv", Favorites);
    await seedFromCsv("./image.csv", Images);
    // await seedFromCsv("./review.csv", Reviews);
    await seedFromCsv("./staff.csv", Staffs);
    await seedFromCsv("./user.csv", Users);

    // Send succes respons
    res.send({ message: "Seeding completed" });
  } catch (err) {
    // Fejlhåndtering med respons
    res.status(500).json({ error: err.message });
  }
});
