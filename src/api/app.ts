import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParse from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { sessionConfig } from "../configs";
import { showLogs } from "../libs";
import { localStrategy, authService } from "../auth";
import { HealthController, useUserRouter, userAuthRouter } from "./controllers";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(cookieParse());
// session
app.use(session(sessionConfig));
// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);
passport.serializeUser<string>(authService.serializer);
passport.deserializeUser<string>(authService.deserializer);

showLogs(app);

HealthController.use(app);
useUserRouter(app);
userAuthRouter(app);
