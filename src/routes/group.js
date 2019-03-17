import express from 'express';

import Group from '../controllers/groups';

import validateGroup from '../helpers/validations/group';

const { validate } = validateGroup;

const { create, getAll, deleteGroup, createGroupMessage, addUserToGroup, updateGroup } = Group;

const groupRouter = express.Router();


groupRouter.route('/').post(validate, create);

groupRouter.route('/:groupId/users').post(addUserToGroup);

groupRouter.route('/').get(getAll);

groupRouter.route('/:id').patch(updateGroup);

groupRouter.route('/:id').delete(deleteGroup);

export default groupRouter;
