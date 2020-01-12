import express from 'express';

import Employee from '../controllers/employee';

const { createEmployee, updateEmployee, deleteEmployee, activateEmployee, suspendEmployee, getAllEmployees, searchEmployee } = Employee;

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
employeeRouter.patch('/employees/:id/suspend', suspendEmployee);
employeeRouter.get('/employees', getAllEmployees);
employeeRouter.get('/employees/search', searchEmployee);


export default employeeRouter;
