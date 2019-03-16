import express from 'express';

import User from '../controllers/user';

import validateUser from '../helpers/validations/user';

const { validate } = validateUser;

const { create, login, deleteUser} = User;

import { jsonParser } from '../middleware/bodyParser';

const userRouter = express.Router();


userRouter.route('/register')
  .post(jsonParser, create);

  userRouter.route('/login')
    .post(jsonParser, login);

userRouter.route('/me')
  .delete(deleteUser)

export default userRouter;
