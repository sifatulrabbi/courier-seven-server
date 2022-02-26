import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParse from 'cookie-parser';
import { prepareSession, preparePassport } from '../configs';
import { showLogs } from '../libs';
import {
  HealthController,
  useUserRouter,
  useAuthRouter,
  useParcelsController,
  useShopsController,
} from './controllers';

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

HealthController.use(app);
useUserRouter(app);
useAuthRouter(app);
useParcelsController(app);
useShopsController(app);
