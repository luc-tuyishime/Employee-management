import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';
import { validateDraftMessage } from '../helpers/validations/draftMessage';


// SEND Draft MESSAGE to TABLE Draft
const draftMessage = {
  async create(req, res) {

    const { error } = validateDraftMessage(req.body);
      if (error) {
        return res.status(400).send({
          status: 400,
          error: error.details[0].message
        });
    }

      const text = `INSERT INTO
        drafts(subject, message, parentMessageId, status, sender_id, createdOn)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;
      const values = [
        req.body.subject,
        req.body.message,
        uuidv4(),
        req.body.status,
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
          error: 'draft not sended!',
        });
      } catch (error) {
        console.log(error);
      }
  },

  // DELETE A DRAFT MESSAGE
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM drafts WHERE id = $1 AND sender_id = $2 RETURNING *';
    try {
       const {
         rows
       } = await pool.query(deleteQuery, [req.params.id, req.user.id]);

       if (rows.length > 0) {
         return res.json({
           status: 204,
           message: 'message deleted !',
         });
       }

       return res.status(400).json({
         status: 400,
         error: 'drafts doesn\'t exist',
       });
     } catch (error) {
       console.log(error)
     }
  }
}

export default draftMessage;
