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

            const getAge = Math.floor((new Date() - new Date(req.body.birth).getTime()) / 3.15576e+10);
            console.log('here is the age', getAge);

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
}

export default Employee;