import { Router } from "express";
import {
    verifyUserShopMiddleware,
    verifyShopParcelMiddleware,
} from "../middlewares";
import { ParcelsController } from "../controllers";

const controller = new ParcelsController();

const router = Router();

router
    .route("/")
    .get(verifyUserShopMiddleware, controller.getAll)
    .post(verifyUserShopMiddleware, controller.create);

router
    .route("/:id")
    .get(
        verifyUserShopMiddleware,
        verifyShopParcelMiddleware,
        controller.getById,
    )
    .put(
        verifyUserShopMiddleware,
        verifyShopParcelMiddleware,
        controller.update,
    )
    .delete(
        verifyUserShopMiddleware,
        verifyShopParcelMiddleware,
        controller.remove,
    );

export const parcelsRouter = router;
