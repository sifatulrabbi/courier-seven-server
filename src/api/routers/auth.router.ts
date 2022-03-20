import { Router } from "express";
import { checkUserMiddleware } from "../middlewares";
import { authController } from "../controllers";
import passport from "passport";

const router = Router();

router.route("/register").post(checkUserMiddleware, authController.registerGet);

router
    .route("/register/final")
    .post(checkUserMiddleware, authController.registerPost);

router
    .route("/login")
    .get(authController.loginGet)
    .post(passport.authenticate("jwt", { session: false }));

router.route("/logout").post(authController.logoutPost);

export const authRouter = router;
