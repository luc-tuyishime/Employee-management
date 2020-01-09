import express from 'express';

import Employee from '../controllers/employee';

const { createEmployee } = Employee;

import validateUser from '../helpers/validations/user';

import checkIfManager from '../middleware/checkIfManager';

const { validate } = validateUser;

const employeeRouter = express.Router();

employeeRouter.post('/employees', createEmployee);


export default employeeRouter;
