import express from 'express';

import Group from '../controllers/groups';

import validateGroup from '../helpers/validations/group';

import messageValidate from '../helpers/validations/message';

const { validateMessageGroup } = messageValidate;

const { validate } = validateGroup;

const { create, getAll, deleteGroup, createGroupMessage, addUserToGroup, updateGroup, deleteGroupMember } = Group;

const groupRouter = express.Router();


groupRouter.route('/').post(validate, create);

groupRouter.route('/:groupId/messages').post(validateMessageGroup, createGroupMessage);

groupRouter.route('/:groupId/users').post(addUserToGroup);

groupRouter.route('/:groupId/users/:userId').delete(deleteGroupMember);

groupRouter.route('/').get(getAll);

groupRouter.route('/:id').patch(updateGroup);

groupRouter.route('/:id').delete(deleteGroup);

export default groupRouter;
