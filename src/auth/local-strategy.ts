import { Strategy } from 'passport-local';
import { authService } from '../services';

export const localStrategy = new Strategy(
  {
    usernameField: 'mobile',
    passwordField: 'password',
  },
  authService.verifyLogin,
);
