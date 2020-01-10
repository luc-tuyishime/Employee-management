import express from 'express';

import Employee from '../controllers/employee';

const { createEmployee } = Employee;

import validateUser from '../helpers/validations/user';

import { checkifNumber, checkIfNumberValid } from '../middleware/checkIdNumber';

import checkIfManager from '../middleware/checkIfManager';

const { validate } = validateUser;

const employeeRouter = express.Router();

employeeRouter.post('/employees', checkIfManager, checkifNumber, checkIfNumberValid, createEmployee);


export default employeeRouter;
