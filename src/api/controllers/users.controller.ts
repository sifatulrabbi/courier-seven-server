import { Router, Express, Request, Response } from "express";
import { IUser } from "../../interfaces";
import { CustomResponse, trimUser } from "../../libs";
import { usersService, emailService } from "../../services";

const router = Router();

/**
 * @route /all
 * @method GET
 * @controller return all the users
 */
router.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAll();
    CustomResponse.ok(res, "Success", users);
  } catch (err) {
    CustomResponse.internal(res, false, null);
  }
});

/**
 * @route /profile
 * @method GET
 * @controller returns the profile of the logged in user
 */
router.get("/profile", async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated()) {
      CustomResponse.unauthorized(
        res,
        "Please login to get your profile",
        "User not logged in"
      );
      return;
    }

    const loggedInUser = req.user as IUser;
    const user = await usersService.find({ id: loggedInUser._id });

    if (user) {
      CustomResponse.ok(res, "Success", [trimUser(user)]);
    } else {
      CustomResponse.notFound(res, "User not found", null);
    }
  } catch (err) {
    CustomResponse.badRequest(res, false, err);
  }
});

/**
 * @route /profile/:id
 * @param id
 * @method GET
 * @controller finds a user with the id
 */
router.get("/profile/:id", async (req: Request, res: Response) => {
  try {
    const user = await usersService.find({ id: req.params.id });
    if (!user) return CustomResponse.notFound(res, "User not found", null);

    CustomResponse.ok(res, false, [user]);
  } catch (err) {
    CustomResponse.badRequest(res, false, String(err));
  }
});

/**
 * @route /
 * @method POST
 * @controller creates user
 * @redirects /profile
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const user = await usersService.create(req.body);
    emailService.sendUserCreationMail(user);
    CustomResponse.created(res, "User registered", [user]);
  } catch (err) {
    CustomResponse.badRequest(res, false, String(err));
  }
});

/**
 * @route /profile/:id
 * @method DELETE
 * @controller removes user
 */
router.delete("/profile/:id", async (req: Request, res: Response) => {
  try {
    const user = await usersService.remove(req.params.id);
    if (!user) return CustomResponse.notFound(res, "User not found", null);
    CustomResponse.ok(res, "User removed");
  } catch (err) {
    CustomResponse.badRequest(res, false, String(err));
  }
});

export function useUserRouter(app: Express) {
  app.use("/api/v1/users", router);
}
