import express from "express";
import { Staffs } from "../models/staffs.model.js";

export const staffController = express.Router();

staffController.get("/staffs", async (req, res) => {
  try {
    let staffData = await Staffs.findAll();

    if (!staffData || staffData.length === 0) {
      return res.status(404).json({ message: "No staff found" });
    }

    res.json(staffData);
  } catch (error) {
    res.status(500).send({
      message: `Error in call for model: Staffs: ${error}`,
    });
  }
});

staffController.get("/staffs/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Staffs.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Staff with id ${id} was not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error while calling model Staffs: ${error.message}`,
    });
  }
});

staffController.post("/staffs", async (req, res) => {
  const { firstname, lastname, position, image, phone, email } = req.body;

  if (!firstname || !lastname || !position || !image || !phone || !email) {
    return res.status(400).json({ message: `You need to add all the details` });
  }

  try {
    const result = await Staffs.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when trying to create staff", error);

    res.status(500).json({
      message: `Error when creating city in model Staffs: ${error.message}`,
    });
  }
});

staffController.put("/staffs", async (req, res) => {
  const { id, name, zipcode } = req.body;

  if (id && name) {
    try {
      const result = await Staffs.update({ zipcode, name }, { where: { id } });

      if (result[0] > 0) {
        res
          .status(200)
          .json({ message: `Staff with id ${id} was updated to ${name}` });
      } else {
        res
          .status(404)
          .json({ message: `Staff with ${id} was not found in the database` });
      }
    } catch (error) {
      res.status(500).json({
        message: `Error while updating model Staffs: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in model Staffs: Missing data",
    });
  }
});

staffController.delete("/staffs/:id([0-9]+)", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id missing in request body." });
  }

  try {
    let result = await Staffs.destroy({
      where: { id: id },
    });

    if (result > 0) {
      res.status(200).json({ message: `Staff with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `Staff with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in model Staffs: ${error.message}`,
    });
  }
});
