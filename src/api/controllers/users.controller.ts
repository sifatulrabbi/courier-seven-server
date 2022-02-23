import type { IUser } from "../../interfaces";
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
    usersService.findAll((err, users) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      CustomResponse.ok(res, "ok", users);
    });
  })
  .post((req: Request, res: Response) => {
    usersService.createProfile(req.body, (err, user) => {
      if (err) return CustomResponse.notFound(res, err.message, err);
      CustomResponse.created(res, false, [user]);
    });
  });

/**
 *
 * @route /profile
 * @method GET
 * @description returns the profile of the logged in user
 */
router.route("/profile").get((req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return CustomResponse.unauthorized(res, false, null);
  }

  const user = req.user as IUser;
  usersService.findProfile({ userId: user._id }, (err, profile) => {
    if (err) return CustomResponse.notFound(res, err.message, null);
    CustomResponse.ok(res, false, [profile]);
  });
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
    usersService.findProfile({ profileId: req.params.id }, (err, profile) => {
      if (err) return CustomResponse.notFound(res, err.message, null);
      CustomResponse.ok(res, false, [profile]);
    });
  })
  .put((req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      CustomResponse.unauthorized(res, false, null);
    }

    const user = req.user as IUser;
    const id = user._id || "id";
    usersService.updateProfile(id, req.body, (err, profile) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      CustomResponse.ok(res, false, [profile]);
    });
  })
  .delete((req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      CustomResponse.unauthorized(res, false, null);
    }

    const user = req.user as IUser;
    const id = user._id || "id";
    usersService.removeUser(id, (err, user) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      CustomResponse.ok(res, "User removed", [user]);
    });
  });

export function useUserRouter(app: Express) {
  app.use("/api/v1/users", router);
}
