import { Router } from "express";
import { shopsController } from "../controllers";

const router = Router();

router.route("/all").get(shopsController.getAll);

router
    .route("/:id")
    .get(shopsController.getOne)
    .put(shopsController.update)
    .delete(shopsController.remove);

router.route("/").get(shopsController.getByUser).post(shopsController.create);

export const shopsRouter = router;
