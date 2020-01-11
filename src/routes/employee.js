import express from 'express';

import Employee from '../controllers/employee';

const { createEmployee } = Employee;

import validateUser from '../helpers/validations/user';

import checkEmployeeAge from '../middleware/checkEmployeeAge';

import { checkifNumber, checkIfNumberValid } from '../middleware/checkIdNumber';

import checkIfManager from '../middleware/checkIfManager';

const { validate } = validateUser;

const employeeRouter = express.Router();

employeeRouter.post('/employees', checkIfManager, checkifNumber, checkIfNumberValid, checkEmployeeAge, createEmployee);


export default employeeRouter;
