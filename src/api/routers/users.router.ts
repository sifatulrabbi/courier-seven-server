import { Router } from 'express';
import { usersController } from '../controllers';
import { authGuard } from '../middlewares';

const router = Router();

router.route('/').get(usersController.getAll);

router
    .route('/:id')
    .get(authGuard, usersController.getOne)
    .put(authGuard, usersController.update)
    .delete(authGuard, usersController.remove);

export const usersRouter = router;
