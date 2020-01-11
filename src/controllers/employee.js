import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';
import { Helper } from '../helpers/helpers';
import * as helper from '../helpers';

import { checkNationalIDTwo, checkNumberTwo, checkEmail } from '../helpers/checkIfUnique';

const Employee = {

    async createEmployee(req, res) {
        if (!Helper.isValidEmail(req.body.email)) {
            return res
                .status(400)
                .send({ message: 'Please enter a valid email address' });
        }
        const text = `INSERT INTO
        employees(name, nationalId, phone, email, birth, status, position, managerId, createdOn)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *`;
        const values = [
            req.body.name,
            req.body.nationalId,
            req.body.phone,
            req.body.email,
            req.body.birth,
            req.body.status,
            req.body.position,
            req.user.id,
            moment().format('LL')
        ];
        try {
            const {
                rows
            } = await pool.query(text, values);

            if (rows.length > 0) {
                await helper.sendMail(req.body.email, 'newEmployee');
                return res.status(201).json({
                    status: 201,
                    data: rows[0]
                });
            }

            return res.status(400).json({
                status: 400,
                error: 'employee not created!'
            });
        } catch (error) {
            checkNationalIDTwo(error, res);
            checkNumberTwo(error, res);
            checkEmail(error, res);
            return res.status(400).send({
                status: 400,
                error
            });
        }
    },


    // UPDATE AN EMPLOYEE
    async updateEmployee(req, res) {
        const findOneQuery = 'SELECT * FROM employees WHERE id = $1 AND managerId = $2';
        const updateOneQuery = `UPDATE employees
       SET name = $1, nationalId = $2, phone = $3, email = $4, birth = $5, status = $6, 
       position = $7,  createdOn = $8
       WHERE id = $9 AND managerId = $10 returning *`;
        try {
            const { rows } = await pool.query(findOneQuery, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'employee not found' });
            }
            const values = [
                req.body.name || rows[0].name,
                req.body.nationalId || rows[0].nationalId,
                req.body.phone || rows[0].phone,
                req.body.email || rows[0].email,
                req.body.birth || rows[0].birth,
                req.body.status || rows[0].status,
                req.body.position || rows[0].position,
                moment().format('LL'),
                req.params.id,
                req.user.id
            ];
            const response = await pool.query(updateOneQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch (err) {
            // return res.status(400).send(err);
            console.log(err);
        }
    },
}

export default Employee;