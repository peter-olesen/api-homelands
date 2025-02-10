import express from "express";

import { sequelize } from "./config/sequelize.config.js";
import { dbController } from "./controllers/db.controller.js";
import { cityController } from "./controllers/cities.controller.js";
import { estateController } from "./controllers/estates.controller.js";
import { estateTypeController } from "./controllers/estate_types.controller.js";
import { favoriteController } from "./controllers/favorites.controller.js";
import { reviewController } from "./controllers/reviews.controller.js";
import { staffController } from "./controllers/staffs.controller.js";
import { userController } from "./controllers/users.controller.js";
import { authController } from "./controllers/auth.controller.js";

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));

app.use(
  dbController,
  authController,
  cityController,
  estateController,
  estateTypeController,
  favoriteController,
  reviewController,
  staffController,
  userController
);

app.get("/", (req, res) => {
  res.send("Hello from Homelands API");
});

app.get("/login", (req, res) => {});

app.get("/api", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Contact with Homelands API established");
    res.send("API works!");
  } catch (error) {
    console.error("Error", error);
    res.status(500).send(`Error connectiong to the server: ${error.message}`);
  }
});

app.use((req, res, next) => {
  res.send(404).send("Sorry can't find that");
});

app.listen(port, () => {
  console.log(`Homelands API is running on http://localhost:${port}`);
});
