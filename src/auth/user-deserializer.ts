import { IUserSession } from "../interfaces";
import { trimUser } from "../libs";
import { usersService } from "../services";

export async function userDeserializer(
  userId: string,
  done: (err: any, user: IUserSession | false) => void
): Promise<void> {
  try {
    console.log("Deserializer");
    const user = await usersService.find({ id: userId });
    if (!user) return done(new Error("User not found"), false);
    done(null, trimUser(user));
  } catch (err) {
    done(err, false);
  }
}
