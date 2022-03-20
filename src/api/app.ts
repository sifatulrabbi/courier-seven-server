import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParse from "cookie-parser";
import { prepareSession, preparePassport, config } from "../configs";
import { showLogs } from "../lib";
import {
    authRouter,
    usersRouter,
    shopsRouter,
    parcelsRouter,
    locationsRouter,
} from "./routers";
import { handleError, setHeaders } from "./middlewares";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
    cors({
        origin: config.ORIGINS,
        credentials: true,
    }),
);
app.use(mongoSanitize());
app.use(cookieParse());
prepareSession(app);
preparePassport(app);

app.use(setHeaders);
showLogs(app);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/shops", shopsRouter);
app.use("/api/v1/parcels", parcelsRouter);
app.use("/api/v1/locations", locationsRouter);

app.use(handleError);
