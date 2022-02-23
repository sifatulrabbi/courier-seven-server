import { Router, Express, Request, Response } from "express";

const router = Router();

/**
 *
 * @path /
 * @method GET
 * @description get all the parcels
 */

export function useParcelsController(app: Express) {
  app.use("/api/v1/parcels", router);
}
