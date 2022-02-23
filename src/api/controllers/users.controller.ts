import type { IUser, IUserProfile } from "../../interfaces";
import { Router, Express, Request, Response } from "express";
import { CustomResponse } from "../../libs";
import { usersService } from "../../services";

const router = Router();

/**
 *
 * @route /all
 * @method GET
 * @description get all users information
 *
 * @method POST
 * @description create user
 */
router
  .route("/")
  .get((req: Request, res: Response) => {
    try {
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  })
  .post((req: Request, res: Response) => {
    try {
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  });

/**
 *
 * @route /profile
 * @method GET
 * @description returns the profile of the logged in user
 */
router.route("/profile").get((req: Request, res: Response) => {
  try {
  } catch (err: any) {
    CustomResponse.internal(res, err.message, err);
  }
});

/**
 *
 * @route /profile/:id
 * @param id
 * @method GET
 * @description finds an user with the id
 *
 * @method PUT
 * @description updates an user
 *
 * @method DELETE
 * @description removes an user
 */
router
  .route("/profile/:id")
  .get((req: Request, res: Response) => {
    try {
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  })
  .put((req: Request, res: Response) => {
    try {
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  })
  .delete((req: Request, res: Response) => {
    try {
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  });

export function useUserRouter(app: Express) {
  app.use("/api/v1/users", router);
}
