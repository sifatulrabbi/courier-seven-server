import { Express, Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { CustomResponse } from "../../libs";

const router = Router();

/**
 * @route /login
 * @method POST
 * @controller login user and redirect to user profile
 */
router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response, next: NextFunction) => {
    CustomResponse.ok(res, "Authenticated", [req.user]);
    // passport.authenticate(
    //   "local",
    //   {
    //     session: true,
    //   },
    //   function (
    //     err: any,
    //     user: { _id: string; email: string },
    //     info: { message: string }
    //   ) {
    //     if (err) {
    //       CustomResponse.unauthorized(res, false, err);
    //       return;
    //     }
    //     if (!user) {
    //       CustomResponse.unauthorized(res, info.message, false);
    //       return;
    //     }
    //     req.logIn(user, function (err) {
    //       if (err) {
    //         CustomResponse.unauthorized(res, false, err);
    //         return;
    //       } else {
    //         CustomResponse.ok(res, "Login successful");
    //       }
    //     });
    //   }
    // )(req, res, next);
  }
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logOut();
  CustomResponse.ok(res, "Logout successful");
});

export function userAuthRouter(app: Express) {
  app.use("/api/v1/auth", router);
}
