import { Router } from "express";
import { checkUserMiddleware } from "../middlewares";
import { authController } from "../controllers";

const router = Router();

router.route("/register").post(checkUserMiddleware, authController.registerGet);

router
    .route("/register/final")
    .post(checkUserMiddleware, authController.registerPost);

router
    .route("/login")
    .get(authController.loginGet)
    .post(authController.loginPost);

router.route("/logout").post(authController.logoutPost);

export const authRouter = router;
