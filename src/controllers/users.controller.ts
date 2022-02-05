import { Router } from "express";

export const usersController = Router();

usersController.get("/profile");

usersController.get("/:id");

usersController.post("/create");

usersController.put("/profile");

usersController.delete("/profile");
