import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';

const Message = {
  async create(req, res) {
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
    const text = 'SELECT * FROM contacts WHERE id = $1';
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
    const findOneQuery = 'SELECT * FROM contacts WHERE id=$1';
    const updateOneQuery =`UPDATE contacts
      SET email=$1,firstname=$2,lastname=$3, modifiedOn=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'contact not found'});
      }
      const values = [
        req.body.email || rows[0].email,
        req.body.firstname || rows[0].firstname,
        req.body.lastname || rows[0].lastname,
        moment(new Date()),
        req.params.id
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM contacts WHERE id=$1 returning *';
    try {
      const { rows } = await pool.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'contacts not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Message;
