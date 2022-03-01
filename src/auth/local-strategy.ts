import { Strategy } from 'passport-local';
import { authService } from '../services';

export const localStrategy = new Strategy(
  {
    usernameField: 'email', // using email instead of mobile verification
    passwordField: 'password',
  },
  authService.verifyLogin,
);
