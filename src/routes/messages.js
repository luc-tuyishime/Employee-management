import express from 'express';

import Message from '../controllers/messages';

import { jsonParser } from '../helpers/bodyParser';

const messageRouter = express.Router();



messageRouter.route('/:id')
  .get(Message.getOne)
  .put(jsonParser, Message.update)
  .delete(Message.delete);

messageRouter.route('/:userId')
  .get(Message.getAll)
  .post(jsonParser, Message.create);

messageRouter.route('/')
  .get(Message.getAll);

messageRouter.route('/unread')
  .get(Message.getUnread);

messageRouter.route('/saved/emails')
  .get(Message.getSaved);


export default messageRouter;
