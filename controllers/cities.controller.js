import express from "express";
import { Cities } from "../models/cities.model.js";

export const cityController = express.Router();

cityController.get("/cities", async (req, res) => {
  try {
    let cityData = await Cities.findAll();

    if (!cityData || cityData.length === 0) {
      return res.status(404).json({ message: "No cities found" });
    }

    res.json(cityData);
  } catch (error) {
    res.status(500).send({
      message: `Error in call for model: Cities: ${error}`,
    });
  }
});

cityController.get("/cities/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Cities.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `City with id ${id} was not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error while calling model Cities: ${error.message}`,
    });
  }
});

cityController.post("/cities", async (req, res) => {
  const { zipcode, name } = req.body;

  if (!zipcode || !name) {
    return res
      .status(400)
      .json({ message: `You need to add both zipcode and name` });
  }

  try {
    const result = await Cities.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when trying to create city", error);

    res.status(500).json({
      message: `Error when creating city in model Cities: ${error.message}`,
    });
  }
});

cityController.put("/cities", async (req, res) => {
  const { id, name, zipcode } = req.body;

  if (id && name) {
    try {
      const result = await Cities.update({ zipcode, name }, { where: { id } });

      if (result[0] > 0) {
        res
          .status(200)
          .json({ message: `City with id ${id} was updated to ${name}` });
      } else {
        res
          .status(404)
          .json({ message: `City with ${id} was not found in the database` });
      }
    } catch (error) {
      res.status(500).json({
        message: `Error while updating model Cities: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in model Cities: Missing data",
    });
  }
});

cityController.delete("/cities/:id([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Cities.destroy({
      where: { id },
    });

    if (result > 0) {
      res.status(200).json({ message: `City with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `City with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in model Cities: ${error.message}`,
    });
  }
});
