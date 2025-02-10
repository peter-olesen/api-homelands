import express from "express";
import { Favorites } from "../models/favorites.model.js";

export const favoriteController = express.Router();

favoriteController.get("/favorites", async (req, res) => {
  try {
    let favoriteData = await Favorites.findAll();

    if (!favoriteData || favoriteData.length === 0) {
      return res.status(404).json({ message: "No Favorites found" });
    }

    res.json(favoriteData);
  } catch (error) {
    res.status(500).send({
      message: `Error in call for model: Favorites: ${error}`,
    });
  }
});

favoriteController.get("/favorites/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Favorites.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Favorite with id ${id} was not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error while calling model Favorites: ${error.message}`,
    });
  }
});

favoriteController.post("/favorites", async (req, res) => {
  const { zipcode, name } = req.body;

  if (!zipcode || !name) {
    return res
      .status(400)
      .json({ message: `You need to add both zipcode and name` });
  }

  try {
    const result = await Favorites.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when trying to create favorite", error);

    res.status(500).json({
      message: `Error when creating favorite in model Favorites: ${error.message}`,
    });
  }
});

favoriteController.put("/favorites", async (req, res) => {
  const { id, name, zipcode } = req.body;

  if (id && name) {
    try {
      const result = await Favorites.update(
        { zipcode, name },
        { where: { id } }
      );

      if (result[0] > 0) {
        res
          .status(200)
          .json({ message: `Favorite with id ${id} was updated to ${name}` });
      } else {
        res
          .status(404)
          .json({
            message: `Favorite with ${id} was not found in the database`,
          });
      }
    } catch (error) {
      res.status(500).json({
        message: `Error while updating model Favorites: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in model Favorites: Missing data",
    });
  }
});

favoriteController.delete("/favorites/:id([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Favorites.destroy({
      where: { id },
    });

    if (result > 0) {
      res
        .status(200)
        .json({ message: `Favorite with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `Favorite with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in model Favorites: ${error.message}`,
    });
  }
});
