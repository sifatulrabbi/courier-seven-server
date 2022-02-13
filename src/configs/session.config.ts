import type { Express } from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import { config } from "./config";

const sessionConfig = {
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

export function prepareSession(app: Express) {
    app.use(session(sessionConfig));
}
