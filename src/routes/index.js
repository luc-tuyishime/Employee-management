import express from 'express';
import messageRouter from './messages';
import groupRouter from './group';
import userRouter from './users';
import Auth from '../middleware/auth';

const Router = express.Router();

Router.use('/users', userRouter);
Router.use('/messages', Auth.verifyToken, messageRouter);
Router.use('/groups', Auth.verifyToken, groupRouter);


export default Router;
