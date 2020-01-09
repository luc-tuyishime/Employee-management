import "@babel/polyfill";
import express from 'express';
import userRouter from './employees';
import Auth from '../middleware/auth';

const Router = express.Router();

Router.use('/users', userRouter);
// Router.use('/messages', Auth.verifyToken, messageRouter);
// Router.use('/groups', Auth.verifyToken, groupRouter);


export default Router;
