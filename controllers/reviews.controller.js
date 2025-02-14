import express from "express";
import { Reviews } from "../models/reviews.model.js";
import { Estates } from "../models/estates.model.js";

export const reviewController = express.Router();

Reviews.belongsTo(Estates, {
  foreignKey: {
    allowNull: true,
  },
});

Estates.hasMany(Reviews);

reviewController.get("/reviews", async (req, res) => {
  try {
    let reviewsData = await Reviews.findAll();

    if (!reviewsData || reviewsData.length === 0) {
      return res.status(404).json({ message: "No Reviews found" });
    }

    res.json(reviewsData);
  } catch (error) {
    res.status(500).send({
      message: `Error in call for model: Reviews: ${error}`,
    });
  }
});

reviewController.get("/reviews/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Reviews.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Review with id ${id} was not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error while calling model Reviews: ${error.message}`,
    });
  }
});

reviewController.post("/reviews", async (req, res) => {
  const { subject, comment, num_stars, date, estate_id, user_id, is_active } =
    req.body;

  if (
    !subject ||
    !comment ||
    !num_stars ||
    !date ||
    !estate_id ||
    !user_id ||
    !is_active
  ) {
    return res.status(400).json({ message: `You need to add all the details` });
  }

  try {
    const result = await Reviews.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when trying to create review", error);

    res.status(500).json({
      message: `Error when creating review in model Reviews: ${error.message}`,
    });
  }
});

reviewController.put("/reviews", async (req, res) => {
  const {
    id,
    subject,
    comment,
    num_stars,
    date,
    estate_id,
    user_id,
    is_active,
  } = req.body;

  if (
    id &&
    subject &&
    comment &&
    num_stars &&
    date &&
    estate_id &&
    user_id &&
    is_active
  ) {
    try {
      const result = await Reviews.update(
        { subject, comment, num_stars, date, estate_id, user_id, is_active },
        { where: { id } }
      );

      if (result[0] > 0) {
        res.status(200).json({ message: `Review with id ${id} was updated.` });
      } else {
        res.status(404).json({
          message: `Review with ${id} was not found in the database`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `Error while updating model Reviews: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in model Reviews: Missing data",
    });
  }
});

reviewController.delete("/reviews", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id missing in request body." });
  }

  try {
    let result = await Reviews.destroy({
      where: { id: id },
    });

    if (result > 0) {
      res
        .status(200)
        .json({ message: `Review with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `Review with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in model Reviews: ${error.message}`,
    });
  }
});
