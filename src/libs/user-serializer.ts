export function userSerializer(
  user: any,
  done: (err: any, id?: string) => void
): void {
  if (user._id) {
    done(null, user._id);
  } else {
    done(new Error("User id not found"));
  }
}
