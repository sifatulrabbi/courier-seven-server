import { Express } from 'express';
import { authGuard } from '../middlewares';
import { shopsController } from '../controllers';

const router = Router();

router.route('/all').get(shopsController.getAll);

router
  .route('/:id')
  .get(authGuard, shopsController.getOne)
  .put(authGuard, shopsController.update)
  .delete(authGuard, shopsController.remove);

router
  .route('/')
  .get(authGuard, shopsController.getByUser)
  .post(authGuard, shopsController.create);

export const shopsRouter = router;
