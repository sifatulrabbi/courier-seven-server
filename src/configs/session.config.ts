import type { Express } from 'express';
import session from 'express-session';
import { config } from './config';
import { mongoStore } from './mongo-store';

const sessionConfig = {
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: config.COOKIE_MAX_AGE,
    httpOnly: true,
  },
  store: mongoStore,
};

export function prepareSession(app: Express) {
  app.use(session(sessionConfig));
}
