import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';


const Message = {

  // SEND MESSAGE TO USER
  async create(req, res) {
      const text = `INSERT INTO
        messages(subject, message, parentMessageId, status, senderId, receiverId, createdOn)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;
      const values = [
        req.body.subject,
        req.body.message,
        uuidv4(),
        req.body.status,
        req.user.id,
        req.params.userId,
        moment().format('LL')
      ];

      try {
        const checkUser = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.userId]);

        if (checkUser.rows.length <= 0) {
          return res.status(200).json({
            status: 200,
            error: 'Sorry, this user doesn\'t exist',
          });
        }

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
          error: 'message not sended!',
        });
      } catch (error) {
        console.log(error);
      }
  },

  // GET ALL MESSAGES
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM messages WHERE receiverId = $1';
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
      return res.status(204).json({
        status: 204,
        error: 'You have no messages',
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  // GET ONE EMAIL
  async getOne(req, res) {
    try {
      const {
        rows
      } = await pool.query('SELECT * FROM messages WHERE id = $1 AND receiverId = $2', [req.params.id, req.user.id]);
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
      return res.status(204).json({
        status: 204,
        error: 'message not found...',
      });
    } catch (error) {
      console.log(error);
    }
  },

  // SENT EMAILS
  async sentMessage(req, res) {
    try {
      const {
        rows
      } = await pool.query('SELECT * FROM messages WHERE senderId = $1', [req.user.id]);
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
      return res.status(204).json({
        status: 204,
        error: 'No sent message',
      });
    } catch (error) {
      console.log(error);
    }
  },

  // UPDATE MESSAGE AND SEND
  async update(req, res) {

    const findOneQuery = 'SELECT * FROM messages WHERE senderId = $1 AND receiverId = $2';
    const updateOneQuery =`UPDATE messages
      SET subject = $1, message = $2, status = $4
      WHERE id = $5 AND receiverId = $6 returning *`;
      try {
        const { rows } = await pool.query(findOneQuery, [req.params.id, req.user.id]);
        if(!rows[0]) {
          return res.status(404).send({'message': 'message not found'});
        }
        const values = [
          req.body.subject || rows[0].subject,
          req.body.message || rows[0].message,
          req.body.parentMessageId || rows[0].parentMessageId,
          req.body.status || rows[0].status,
          moment().format('LL'),
          req.params.id,
          req.user.id
        ];
        const response = await pool.query(updateOneQuery, values);
        return res.status(200).send(response.rows[0]);
      } catch(err) {
        return res.status(400).send(err);
    }
  },

  async createDraft(req, res) {

      const text = `INSERT INTO
        drafts(subject, message, parentMessageId, status, senderId, createdOn)
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
  async deleteDraft(req, res) {
    const deleteQuery = 'DELETE FROM drafts WHERE id = $1 AND senderId = $2 RETURNING *';
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

       return res.status(204).json({
         status: 204,
         error: 'drafts doesn\'t exist',
       });
     } catch (error) {
       console.log(error)
     }
  },



  // GET ALL MESSAGES FOR A GROUP
  async getAllGroupMessages(req, res) {
    try {
      const {
        rows
      } = await pool.query('SELECT * FROM groupMessages WHERE groupId = $1 AND senderId = $2', [req.params.groupId, req.user.id]);
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
      return res.status(204).json({
        status: 204,
        error: 'Group not found...',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Message;
