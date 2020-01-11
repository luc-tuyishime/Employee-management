import express from 'express';

import Employee from '../controllers/employee';

const { createEmployee, updateEmployee, deleteEmployee, activateEmployee } = Employee;

import validateUser from '../helpers/validations/user';

import checkEmployeeAge from '../middleware/checkEmployeeAge';

import checkIfRwandaNumber from '../middleware/checkIfRwandanNumber';

import { checkifNumber, checkIfNumberValid } from '../middleware/checkIdNumber';

import checkIfManager from '../middleware/checkIfManager';

const { validate } = validateUser;

const employeeRouter = express.Router();

employeeRouter.post('/employees', checkIfManager, checkifNumber, checkIfNumberValid, checkEmployeeAge, createEmployee);
employeeRouter.patch('/employee/:id', checkIfManager, checkifNumber, checkIfRwandaNumber, checkIfNumberValid, checkEmployeeAge, updateEmployee);
employeeRouter.delete('/employee/:id', deleteEmployee);
employeeRouter.patch('/employees/:id/activate', activateEmployee);


export default employeeRouter;
