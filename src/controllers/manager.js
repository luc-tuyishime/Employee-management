import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';
import { Helper } from '../helpers/helpers';

const Manager = {
  async create(req, res) {
    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: 'Please enter a valid email address' });
    }

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
    managers(name, nationalId, phone, email, birth, status, position, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.name,
      req.body.nationalId,
      req.body.phone,
      req.body.email,
      req.body.birth,
      req.body.status,
      req.body.position,
      hashPassword
    ];

    try {
      const { rows } = await pool.query(createQuery, values);

      const token = Helper.generateToken(rows[0].id);

      return res.status(201).send({
        data: [
          {
            status: 201,
            token,
            user: values
          }
        ]
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

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: 400,
        message: 'Some values are missing'
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter a valid email address'
      });
    }
    const text = 'SELECT * FROM managers WHERE email = $1';
    try {
      const { rows } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          message: 'The email you provided is incorrect'
        });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          status: 400,
          message: 'The password you provided is incorrect'
        });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({
        data: [
          {
            status: 200,
            token,
            user: rows
          }
        ]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Manager;
