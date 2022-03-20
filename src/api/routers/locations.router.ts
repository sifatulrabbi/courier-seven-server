import { Router } from "express";
import { LocationsController } from "../controllers";

const router = Router();
const controller = new LocationsController();

router.get("/", controller.getAll);

router.get("/districts", controller.getDistricts);

router.get("/divisions", controller.getDivisions);

router.get("/upazilas", controller.getUpazilas);

export const locationsRouter = router;
