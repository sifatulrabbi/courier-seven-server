import { Router } from "express";
import { usersController } from "../controllers";
import passport from "passport";

const router = Router();

router.route("/").get(usersController.getAll);

router
    .route("/profile")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.getOne,
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        usersController.update,
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        usersController.remove,
    );

export const usersRouter = router;
