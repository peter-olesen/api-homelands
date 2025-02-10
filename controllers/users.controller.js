import express from "express";
import { Users } from "../models/users.model.js";

export const userController = express.Router();

userController.get("/users", async (req, res) => {
  try {
    let userData = await Users.findAll();

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(userData);
  } catch (error) {
    res.status(500).send({
      message: `Error in call for model: Users: ${error}`,
    });
  }
});

userController.get("/users/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Users.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `User with id ${id} was not found` });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error while calling model Users: ${error.message}`,
    });
  }
});

userController.post("/users", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .json({
        message: `You need to add firstname, lastname, email and password in order to create a user`,
      });
  }

  try {
    const result = await Users.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when trying to create user", error);

    res.status(500).json({
      message: `Error when creating user in model Users: ${error.message}`,
    });
  }
});

userController.put("/users", async (req, res) => {
  const { id, name, zipcode } = req.body;

  if (id && name) {
    try {
      const result = await Users.update({ zipcode, name }, { where: { id } });

      if (result[0] > 0) {
        res
          .status(200)
          .json({ message: `User with id ${id} was updated to ${name}` });
      } else {
        res
          .status(404)
          .json({ message: `User with ${id} was not found in the database` });
      }
    } catch (error) {
      res.status(500).json({
        message: `Error while updating model Users: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in model Users: Missing data",
    });
  }
});

userController.delete("/users/:id([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await Users.destroy({
      where: { id },
    });

    if (result > 0) {
      res.status(200).json({ message: `User with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `User with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in model Users: ${error.message}`,
    });
  }
});
