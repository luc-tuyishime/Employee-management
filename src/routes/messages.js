import express from 'express';

import Message from '../controllers/messages';

import messageValidate from '../helpers/validations/message';

const { update, create, getAll, getUnread, sentMessage, createDraft, deleteDraft, createGroupMessage, getAllGroupMessages } = Message;

const { validate, validateDraft } = messageValidate;

import { jsonParser } from '../middleware/bodyParser';

const messageRouter = express.Router();

messageRouter.route('/sent')
  .get(sentMessage);

  messageRouter.route('/drafts')
    .post(jsonParser, validateDraft, createDraft);

messageRouter.route('/:id')
  .get(Message.getOne)
  .put(jsonParser, validate, update);

messageRouter.route('/:userId')
  .get(Message.getAll)
  .post(jsonParser, validate, create);

messageRouter.route('/groups/:groupId')
  .post(validate, createGroupMessage)
  .get(getAllGroupMessages);

messageRouter.route('/')
  .get(Message.getAll);

messageRouter.route('/unread')
  .get(getUnread);

  messageRouter.route('/drafts/:id')
    .delete(deleteDraft);




export default messageRouter;
