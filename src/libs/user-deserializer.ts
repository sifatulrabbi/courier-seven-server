import { IUserSession } from "../interfaces";

export async function userDeserializer(
  userId: string,
  done: (err: any, user: IUserSession | false) => void
): Promise<void> {}
