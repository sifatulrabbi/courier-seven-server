import { Router, Express } from "express";
import { IUser } from "../../interfaces";
import { CustomResponse } from "../../libs";
import { usersService } from "../../services";

const router = Router();

router
  .route("/")
  .get((req, res) => {
    try {
      usersService.findAll((err, users) => {
        if (err) return CustomResponse.badRequest(res, err.message, err);
        if (!users) return CustomResponse.internal(res, "User not found", err);
        CustomResponse.ok(res, false, users);
      });
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  })
  .post((req, res) => {
    try {
      usersService.create(req.body, (err, user) => {
        if (err) return CustomResponse.badRequest(res, err.message, err);
        if (!user) return CustomResponse.notFound(res, "User not found", null);
        CustomResponse.created(res, false, [user]);
      });
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  });

// find user with id
router.route("/:id").get((req, res) => {
  try {
    usersService.findOne({ id: req.params.id }, (err, user) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!user) return CustomResponse.notFound(res, "User not found", null);
      CustomResponse.ok(res, false, [user]);
    });
  } catch (err: any) {
    CustomResponse.internal(res, err.message, err);
  }
});

// login user
router
  .route("/profile")
  .get((req, res) => {
    if (!req.isAuthenticated()) {
      return CustomResponse.unauthorized(
        res,
        "Please login to view profile",
        null
      );
    }

    try {
      const user = req.user as IUser;
      usersService.findOne({ id: user._id }, (err, user) => {
        if (err) return CustomResponse.badRequest(res, err.message, err);
        if (!user) return CustomResponse.notFound(res, false, null);
        CustomResponse.ok(res, false, [user]);
      });
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  })
  .put((req, res) => {
    if (!req.isAuthenticated()) {
      return CustomResponse.unauthorized(
        res,
        "Please login to update profile",
        null
      );
    }

    try {
      const user = req.user as IUser;
      const data = req.body;
      usersService.update(user._id, data, (err, user) => {
        if (err) return CustomResponse.badRequest(res, err.message, err);
        if (!user) return CustomResponse.notFound(res, false, null);
        CustomResponse.ok(res, false, [user]);
      });
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  })
  .delete((req, res) => {
    if (!req.isAuthenticated()) {
      return CustomResponse.unauthorized(
        res,
        "Please login to remove profile",
        null
      );
    }

    try {
      const user = req.user as IUser;
      usersService.remove(user._id, (err, user) => {
        if (err) return CustomResponse.badRequest(res, err.message, err);
        if (!user) return CustomResponse.notFound(res, false, null);
        CustomResponse.ok(res, false, [user]);
      });
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  });

export function useUserRouter(app: Express) {
  app.use("/api/v1/users", router);
}
