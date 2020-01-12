import express from 'express';

import Employee from '../controllers/employee';

const { createEmployee, updateEmployee, deleteEmployee, activateEmployee, suspendEmployee, getAllEmployees, searchEmployee } = Employee;

import validateEmployee from '../helpers/validations/employee';

import checkEmployeeAge from '../middleware/checkEmployeeAge';

import checkIfRwandaNumber from '../middleware/checkIfRwandanNumber';

import { checkifNumber, checkIfNumberValid } from '../middleware/checkIdNumber';

import checkIfManager from '../middleware/checkIfManager';

const { validate } = validateEmployee;

const employeeRouter = express.Router();

employeeRouter.post('/employees', validate, checkIfManager, checkifNumber, checkIfNumberValid, checkEmployeeAge, createEmployee);
employeeRouter.patch('/employee/:id', checkIfManager, checkifNumber, checkIfRwandaNumber, checkIfNumberValid, checkEmployeeAge, updateEmployee);
employeeRouter.delete('/employee/:id', deleteEmployee);
employeeRouter.patch('/employees/:id/activate', activateEmployee);
employeeRouter.patch('/employees/:id/suspend', suspendEmployee);
employeeRouter.get('/employees', getAllEmployees);
employeeRouter.get('/employees/search', searchEmployee);


export default employeeRouter;
