import express from 'express';

import Group from '../controllers/groups';

import { jsonParser } from '../helpers/bodyParser';

const groupRouter = express.Router();


groupRouter.route('/')
  .post(jsonParser, Group.create);

groupRouter.route('/')
  .get(Group.getAll);

export default groupRouter;
