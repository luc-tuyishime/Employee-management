import express from 'express';

import Message from '../controllers/messages';

import messageValidate from '../helpers/validations/message';

const { update, create, getAll, sentMessage, createDraft, deleteDraft, createGroupMessage, getAllGroupMessages } = Message;

const { validate, validateDraft } = messageValidate;

const messageRouter = express.Router();

messageRouter.route('/sent')
  .get(sentMessage);

  messageRouter.route('/drafts')
    .post(validateDraft, createDraft);

messageRouter.route('/:id')
  .get(Message.getOne)
  .patch(validate, update);

messageRouter.route('/:userId')
  .get(Message.getAll)
  .post(validate, create);

messageRouter.route('/groups/:groupId')
  .post(validate, createGroupMessage)
  .get(getAllGroupMessages);

messageRouter.route('/')
  .get(Message.getAll);

messageRouter.route('/drafts/:id')
  .delete(deleteDraft);




export default messageRouter;
