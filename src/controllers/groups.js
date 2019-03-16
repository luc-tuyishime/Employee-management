import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';
import { validateGroup } from '../helpers/validations/group';


// CREATE GROUP AND OWN
const Group = {
  async create(req, res) {

      const text = `INSERT INTO
        groups(name, role, owner__id, createdOn)
        VALUES($1, $2, $3, $4)
        returning *`;
      const values = [
        req.body.name,
        req.body.role,
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
          error: 'group not created!',
        });
      } catch (error) {
        console.log(error);
      }
  },


  // Get all messages
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM groups WHERE owner__id = $1';
    try {
      const { rows } = await pool.query(findAllQuery, [req.user.id]);
      if (rows.length > 0) {
        let messages = [];
        rows.forEach(message => {
          messages.push(message);
        });
        return res.status(200).json({
          status: 200,
          data: messages,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'You have no groups, please create and own it',
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  // DELETE A GROUP I OWN
  // async delete(req, res) {
  //   const deleteQuery = 'DELETE FROM drafts WHERE id = $1 AND sender_id = $2 RETURNING *';
  //   try {
  //      const {
  //        rows
  //      } = await pool.query(deleteQuery, [req.params.id, req.user.id]);
  //
  //      if (rows.length > 0) {
  //        return res.json({
  //          status: 204,
  //          message: 'message deleted !',
  //        });
  //      }
  //
  //      return res.status(400).json({
  //        status: 400,
  //        error: 'drafts doesn\'t exist',
  //      });
  //    } catch (error) {
  //      console.log(error)
  //    }
  // }
}

export default Group;
