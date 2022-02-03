const usersController = require("express").Router();

usersController.get("/profile");

usersController.get("/:id");

usersController.post("/create");

usersController.put("/profile");

usersController.delete("/profile");

module.exports = usersController;
