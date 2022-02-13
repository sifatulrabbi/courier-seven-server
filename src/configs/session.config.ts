import MongoStore from "connect-mongo";
import { config } from "./config";

export const sessionConfig = {
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: config.COOKIE_MAX_AGE,
        httpOnly: true,
    },
    store: new MongoStore({
        collectionName: "users-session",
        mongoUrl: config.MONGODB_URI,
        ttl: config.COOKIE_MAX_AGE,
        autoRemove: "native",
    }),
};
