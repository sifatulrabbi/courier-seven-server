import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParse from 'cookie-parser';
import { prepareSession, preparePassport } from '../configs';
import { showLogs } from '../lib';
import {
  useAuthRouters,
  useUsersRouters,
  useShopsRouters,
  useParcelsRouter,
} from './routers';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(cookieParse());
prepareSession(app);
preparePassport(app);

showLogs(app);

useAuthRouters(app);
useUsersRouters(app);
useShopsRouters(app);
useParcelsRouter(app);
