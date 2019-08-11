import express from 'express';

import User from '../controllers/user';

const { create, login, deleteUser } = User;

import validateUser from '../helpers/validations/user';

const { validate } = validateUser;

const userRouter = express.Router();

userRouter.post('/register', validate, create);

userRouter.route('/login').post(login);

export default userRouter;
