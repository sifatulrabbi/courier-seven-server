import MongoStore from "connect-mongo";
import { config } from "./config";

export const mongoStore = new MongoStore({
    collectionName: "user-sessions",
    mongoUrl: config.MONGODB_URI,
    ttl: config.COOKIE_MAX_AGE,
    autoRemove: "native",
});
