import type { Application } from 'express';
import passport from 'passport';
import { localStrategy } from '../auth';
import { authService } from '../services';

export function preparePassport(app: Application) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(localStrategy);
  passport.serializeUser<string>(authService.serializer);
  passport.deserializeUser<string>(authService.deserializer);
}
