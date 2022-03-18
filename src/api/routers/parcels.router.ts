import { Router } from 'express';
import {
  authGuard,
  verifyUserShopMiddleware,
  verifyShopParcelMiddleware,
} from '../middlewares';
import { ParcelsController } from '../controllers';

const controller = new ParcelsController();

const router = Router();

router
  .route('/')
  .get(authGuard, verifyUserShopMiddleware, controller.getAll)
  .post(authGuard, verifyUserShopMiddleware, controller.create);

router
  .route('/:id')
  .get(
    authGuard,
    verifyUserShopMiddleware,
    verifyShopParcelMiddleware,
    controller.getById,
  )
  .put(
    authGuard,
    verifyUserShopMiddleware,
    verifyShopParcelMiddleware,
    controller.update,
  )
  .delete(
    authGuard,
    verifyUserShopMiddleware,
    verifyShopParcelMiddleware,
    controller.remove,
  );

export const parcelsRouter = router;
