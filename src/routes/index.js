import "@babel/polyfill";
import express from 'express';
import userRouter from './manager';
import employeeRouter from './employee';
import Auth from '../middleware/auth';

const Router = express.Router();

Router.use('/users', userRouter);
Router.use('/emp', Auth.verifyToken, employeeRouter);
// Router.use('/groups', Auth.verifyToken, groupRouter);


export default Router;
