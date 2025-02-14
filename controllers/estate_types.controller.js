import express from "express";
import { EstateTypes } from "../models/estate_types.model.js";

export const estateTypeController = express.Router();

estateTypeController.get("/estate-type", async (req, res) => {
  try {
    let estateTypeData = await EstateTypes.findAll();

    if (!estateTypeData || estateTypeData.length === 0) {
      return res.status(404).json({ message: "No estate types found" });
    }

    res.json(estateTypeData);
  } catch (error) {
    res.status(500).send({
      message: `Error in call for model: EstateTypes: ${error}`,
    });
  }
});

estateTypeController.get("/estate-type/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await EstateTypes.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Estate type with id ${id} was not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error while calling model EstateTypes: ${error.message}`,
    });
  }
});

estateTypeController.post("/estate-type", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: `You need to add a name` });
  }

  try {
    const result = await EstateTypes.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when trying to create estate type", error);

    res.status(500).json({
      message: `Error when creating estate type in model EstateTypes: ${error.message}`,
    });
  }
});

estateTypeController.put("/estate-type", async (req, res) => {
  const { id, name } = req.body;

  if (id && name) {
    try {
      const result = await EstateTypes.update({ name }, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Estate type with id ${id} was updated to ${name}`,
        });
      } else {
        res.status(404).json({
          message: `Estate type with ${id} was not found in the database`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `Error while updating model EstateTypes: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in model EstateTypes: Missing data",
    });
  }
});

estateTypeController.delete("/estate-type", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id missing in request body." });
  }

  try {
    let result = await EstateTypes.destroy({
      where: { id: id },
    });

    if (result > 0) {
      res
        .status(200)
        .json({ message: `Estate type with id ${id} has been deleted` });
    } else {
      res
        .status(404)
        .json({ message: `Estate type with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in model EstateTypes: ${error.message}`,
    });
  }
});
