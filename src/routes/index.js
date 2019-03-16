import express from 'express';
import messageRouter from './messages';
import groupRouter from './group';
import userRouter from './users';
import Auth from '../middleware/auth';

const Router = express.Router();

Router.use('/messages', Auth.verifyToken, messageRouter);
Router.use('/groups', Auth.verifyToken, groupRouter);
Router.use('/users', userRouter);

export default Router;
