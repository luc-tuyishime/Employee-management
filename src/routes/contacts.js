import express from 'express';

import Message from '../controllers/message';

import { jsonParser } from '../helpers/bodyParser';

const contactRouter = express.Router();

contactRouter.route('/:id')
  .get(Message.getOne)
  .put(jsonParser, Message.update)
  .delete(Message.delete);

contactRouter.route('/')
  .get(Message.getAll)
  .post(jsonParser, Message.create);

export default contactRouter;
