import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';
import { Helper } from '../helpers/helpers';

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
                return res.status(201).json({
                    status: 201,
                    data: rows[0],
                });
            }

            return res.status(400).json({
                status: 400,
                error: 'employee not created!',
            });
        } catch (error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({
                    status: 400,
                    message: 'User with that EMAIL already exist'
                });
            }
            return res.status(400).send({
                status: 400,
                error
            });
        }
    },
}

export default Employee;