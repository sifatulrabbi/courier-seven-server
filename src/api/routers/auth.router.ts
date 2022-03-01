import { Express, Router } from 'express';
import passport from 'passport';
import { checkUserMiddleware, verifyMobileMiddleware } from '../middlewares';
import { authController } from '../controllers';

const router = Router();

router
  .route('/register')
  .get(
    /* verifyMobileMiddleware, */ checkUserMiddleware,
    authController.registerGet,
  )
  .post(
    verifyMobileMiddleware,
    checkUserMiddleware,
    authController.registerPost,
  );

router
  .route('/login')
  .get(/* verifyMobileMiddleware, */ authController.loginGet)
  .post(
    /* verifyMobileMiddleware, */
    passport.authenticate('local', { failureRedirect: '/api/auth/login' }),
    authController.loginPost,
  );

router.route('/logout').post(authController.logoutPost);

export function useAuthRouters(app: Express) {
  app.use('/api/v1/auth', router);
}
