import type { IUser, IUserProfile } from "../../interfaces";
import { Router, Express, Request, Response } from "express";
import { CustomResponse } from "../../libs";
import { usersService } from "../../services";

const router = Router();

/**
 * @route /all
 * @method GET
 * @controller return all the users
 */
router.route("").get((req: Request, res: Response) => {});

/**
 * @route /profile
 * @method GET
 * @controller returns the profile of the logged in user
 */
router.route("").get((req: Request, res: Response) => {});

/**
 * @route /profile/:id
 * @param id
 * @method GET
 * @controller finds a user with the id
 */
router.route("").get((req: Request, res: Response) => {});

/**
 * @route /
 * @method POST
 * @controller creates user
 * @redirects /profile
 */
router.route("").get((req: Request, res: Response) => {});

/**
 * @route /profile/:id
 * @method DELETE
 * @controller removes user
 */
router.route("").get((req: Request, res: Response) => {});

export function useUserRouter(app: Express) {
  app.use("/api/v1/users", router);
}
