import express from "express";
import { Estates } from "../models/estates.model.js";

export const estateController = express.Router();

estateController.get("/estates", async (req, res) => {
  try {
    let estateData = await Estates.findAll();

    if (!estateData || estateData.length === 0) {
      return res.status(404).json({ message: "No Estates found" });
    }

    res.json(estateData);
  } catch (error) {
    res.status(500).send({
      message: `Error in call for model: Estates: ${error}`,
    });
  }
});

estateController.get("/estates/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Estates.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Estate with id ${id} was not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error while calling model Estates: ${error.message}`,
    });
  }
});

estateController.post("/estates", async (req, res) => {
  const { zipcode, name } = req.body;

  if (!zipcode || !name) {
    return res.status(400).json({ message: `You need to add xxx` });
  }

  try {
    const result = await Estates.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when trying to create estate", error);

    res.status(500).json({
      message: `Error when creating estate in model Estates: ${error.message}`,
    });
  }
});

estateController.put("/estates", async (req, res) => {
  const { id, name, zipcode } = req.body;

  if (id && name) {
    try {
      const result = await Estates.update({ zipcode, name }, { where: { id } });

      if (result[0] > 0) {
        res
          .status(200)
          .json({ message: `Estate with id ${id} was updated to ${name}` });
      } else {
        res
          .status(404)
          .json({ message: `Estate with ${id} was not found in the database` });
      }
    } catch (error) {
      res.status(500).json({
        message: `Error while updating model Estates: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in model Estates: Missing data",
    });
  }
});

estateController.delete("/estates/:id([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Estates.destroy({
      where: { id },
    });

    if (result > 0) {
      res
        .status(200)
        .json({ message: `Estate with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `Estate with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in model Estates: ${error.message}`,
    });
  }
});
