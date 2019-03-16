import express from 'express';

import Group from '../controllers/groups';

import validateGroup from '../helpers/validations/group';

import { jsonParser } from '../middleware/bodyParser';

const { validate } = validateGroup;

const { create, getAll } = Group;

const groupRouter = express.Router();


groupRouter.route('/')
  .post(jsonParser, validate, create);

groupRouter.route('/')
  .get(getAll);

export default groupRouter;
