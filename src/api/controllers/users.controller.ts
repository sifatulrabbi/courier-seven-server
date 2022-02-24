import { Router, Express } from "express";
import { IUser } from "../../interfaces";
import { CustomResponse } from "../../libs";
import { usersService } from "../../services";

const router = Router();

router
    .route("/")
    .get((req, res) => {})
    .post((req, res) => {});

// find user with id
router.route("/:id").get((req, res) => {});

// login user
router
    .route("/profile")
    .get((req, res) => {})
    .put((req, res) => {})
    .delete((req, res) => {});

export function useUserRouter(app: Express) {
    app.use("/api/v1/users", router);
}
