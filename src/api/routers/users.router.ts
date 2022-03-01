import { Router, Express } from 'express';
import { usersController } from '../controllers';
import { authGuard } from '../middlewares';

const route = Router();

route.route('/').get(usersController.getAll);

route
  .route('/:id')
  .get(authGuard, usersController.getOne)
  .put(authGuard, usersController.update)
  .delete(authGuard, usersController.remove);

export function useUsersRouters(app: Express) {
  app.use('/api/v1/users', route);
}
