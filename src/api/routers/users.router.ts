import { Router, Express } from 'express';
import { usersController } from '../controllers';
import { authGuard } from '../middlewares';

const route = Router();

route.route('/').get(usersController.getAll);

route.use('/:id', authGuard);

route
  .route('/:id')
  .get(usersController.getOne)
  .put(usersController.update)
  .delete(usersController.remove);

export function useUsersRouters(app: Express) {
  app.use('/api/v1/users', route);
}
