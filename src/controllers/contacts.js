import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';
import { validateContact } from '../helpers/validations/contact';

const Contact = {
  async create(req, res) {

    const { error } = validateContact(req.body);
      if (error) {
        return res.status(400).send({
          status: 400,
          error: error.details[0].message
        });
    }

    const text = `INSERT INTO
      contacts(email, firstname, lastname, createdOn, modifiedOn)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      moment().format('LL'),
      moment().format('LL')
    ];

    try {
      const { rows } = await pool.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM contacts';
    try {
      const { rows, rowCount } = await pool.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM contacts WHERE id_contact = $1';
    try {
      const { rows } = await pool.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'contact not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  async update(req, res) {

    const { error } = validateContact(req.body);
      if (error) {
        return res.status(400).send({
          status: 400,
          error: error.details[0].message
        });
    }

    const findOneQuery = 'SELECT * FROM contacts WHERE id_contact=$1';
    const updateOneQuery =`UPDATE contacts
      SET email=$1,firstname=$2,lastname=$3, modifiedOn=$4
      WHERE id_contact=$5 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: `the contact with id ${req.params.id} is not in the Database`
        });
      }
      const values = [
        req.body.email || rows[0].email,
        req.body.firstname || rows[0].firstname,
        req.body.lastname || rows[0].lastname,
        moment().format('LL'),
        req.params.id
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM contacts WHERE id_contact=$1 returning *';
    try {
      const { rows } = await pool.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({
          status: 404,
          'message': `the contacts with id ${req.params.id} not found in the Database`
        });
      }
      return res.status(204).send({
        status: 204,
        data : [{ message: 'Message deleted from the Database...' }]
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Contact;
