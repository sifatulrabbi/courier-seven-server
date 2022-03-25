import { Router } from "express";
import { usersController } from "../controllers";
import { authInterceptor } from "../middlewares";

const router = Router();

router.route("/").get(usersController.getAll);

router
    .route("/profile")
    .get(authInterceptor, usersController.getOne)
    .put(authInterceptor, usersController.update)
    .delete(authInterceptor, usersController.remove);

export const usersRouter = router;
