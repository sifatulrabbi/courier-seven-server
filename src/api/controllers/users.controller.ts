import { Router, Express } from 'express';
import { IUser } from '../../interfaces';
import { CustomResponse } from '../../lib';
import { usersService } from '../../services';
import { authGuard } from '../middlewares';

const router = Router();
const { ok, badRequest, notFound, forbidden } = CustomResponse;

router
  .route('/')
  // get all users
  .get((req, res) => {
    usersService.all((err, users) => {
      if (err) return badRequest(res, err.message, err);
      if (!users) return notFound(res, 'No users found', null);
      ok(res, false, users);
    });
  });

router
  .route('/:id')
  // find user with id
  .get(authGuard, (req, res) => {
    const user = req.user as IUser;
    const id = req.params.id;
    if (user._id.toString() !== id) {
      return forbidden(res, false, 'Incorrect identity');
    }

    usersService.findOne({ id }, (err, result) => {
      if (err) return badRequest(res, err.message, err);
      if (!result) return notFound(res, 'User not found', null);
      ok(res, false, [result]);
    });
  })
  .put(authGuard, (req, res) => {
    const user = req.user as IUser;
    const id = req.params.id;
    if (user._id.toString() !== id) {
      return forbidden(res, false, 'Incorrect identity');
    }

    const data = req.body;
    usersService.update(id, data, (err, result) => {
      if (err) return badRequest(res, err.message, err);
      if (!result) return notFound(res, false, null);
      ok(res, 'User info updated', [result]);
    });
  })
  .delete(authGuard, (req, res) => {
    const user = req.user as IUser;
    const id = req.params.id;
    if (user._id.toString() !== id) {
      return forbidden(res, false, 'Incorrect identity');
    }

    usersService.remove(id, (err, result) => {
      if (err) return badRequest(res, err.message, err);
      if (!result) return notFound(res, false, null);
      ok(res, result, []);
    });
  });

export function useUserRouter(app: Express) {
  app.use('/api/v1/users', router);
}
