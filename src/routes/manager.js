import express from 'express';

import Manager from '../controllers/manager';

const { create, login } = Manager;

import checkIfRwandaNumber from '../middleware/checkIfRwandanNumber';
import checkIdNumber from '../middleware/checkIdNumber';

import validateUser from '../helpers/validations/user';

const { validate } = validateUser;

const userRouter = express.Router();

userRouter.post('/register', validate, checkIfRwandaNumber, checkIdNumber, create);

userRouter.route('/login').post(login);

export default userRouter;
