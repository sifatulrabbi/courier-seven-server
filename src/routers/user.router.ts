import { Router, Express } from "express";

const userRouter = Router();

/**
 * @route /all
 * @method GET
 * @controller return all the users
 */
userRouter.get("/all");

/**
 * @route /profile
 * @method GET
 * @controller returns the profile of the logged in user
 */
userRouter.get("/profile");

/**
 * @route /profile/:id
 * @param id
 * @method GET
 * @controller finds a user with the id
 */
userRouter.get("/profile/:id");

/**
 * @route /
 * @method POST
 * @controller creates user
 * @redirects /profile
 */
userRouter.post("/");

export function useUserRoute(app: Express) {
  app.use("/api/v1/users", userRouter);
}
