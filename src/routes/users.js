import express from 'express';

import User from '../controllers/user';

import { jsonParser } from '../helpers/bodyParser';

const userRouter = express.Router();


userRouter.route('/')
  .post(jsonParser, User.create);

  userRouter.route('/login')
    .post(jsonParser, User.login);

userRouter.route('/me')
  .delete(User.delete)

export default userRouter;
