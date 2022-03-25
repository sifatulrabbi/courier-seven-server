import { Router } from "express";
import { shopsController } from "../controllers";
import { authInterceptor } from "../middlewares";

const router = Router();

router.route("/all").get(authInterceptor, shopsController.getAll);

router
    .route("/:id")
    .get(authInterceptor, shopsController.getOne)
    .put(authInterceptor, shopsController.update)
    .delete(authInterceptor, shopsController.remove);

router
    .route("/")
    .get(authInterceptor, shopsController.getByUser)
    .post(authInterceptor, shopsController.create);

export const shopsRouter = router;
