import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../models/connect';
import { validateGroup } from '../helpers/validations/group';


const Group = {

  // CREATE GROUP AND OWN
  async create(req, res) {

      const text = `INSERT INTO
        groups(name, role, ownerId, createdOn)
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


  // GET ALL GROUPS
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM groups WHERE ownerId = $1';
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
      return res.json({
        status: 204,
        error: 'You have no groups, please create and own it',
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  },


  // ADD GROUP MEMBER
  async addUserToGroup(req, res) {

  try {
   const row = await pool.query('SELECT * FROM groups WHERE id = $1 AND ownerId = $2', [req.params.id, req.user.id]);
   if (row.length === 0) {
     return res.status(404).json({
       status: 404,
       message: 'invalid id'
     });
   }
   const checkUserId = await pool.query('SELECT * FROM users WHERE id = $1', [req.body.userId]);
   if (checkUserId === 0) {
     return res.status(404).json({
       status: 404,
       message: 'the user you want to add is not our user.'
     });
   }

   const text = `INSERT INTO
           groupMember(userId, userRole, groupId)
           VALUES($1, $2, $3)
           returning *`;

   const values = [
     req.body.userId,
     req.body.userRole,
     req.params.groupId
   ];


   const { rows } = await pool.query(text, values);
   if (rows.length > 0) {
     return res.status(201).json({
       status: 201,
       data: rows
     });
   }

 } catch (error) {
   return res.json({
     status: 204,
     error: 'This user is not registered or group does not exist'
   });
   console.log(error);
    }
  },


  // DELETE GROUP MEMBER
  async deleteGroupMember(req, res) {
    const deleteQuery = 'DELETE FROM groupMember WHERE groupId = $1 AND userId = $2  RETURNING *';
    try {
       const {
         rows
       } = await pool.query(deleteQuery, [req.params.groupId, req.params.userId]);

       if (rows.length > 0) {
         return res.json({
           status: 200,
           message: 'user deleted !',
         });
       }

       return res.status(404).json({
         status: 404,
         error: 'user doesn\'t exist',
       });
     } catch (error) {
       console.log(error)
     }
  },

  // UPDATE A GROUP NAME
  async updateGroup(req, res) {
    const findOneQuery = 'SELECT * FROM groups WHERE id = $1 AND ownerId = $2';
     const updateOneQuery =`UPDATE groups
       SET name = $1, role = $2, createdOn = $3
       WHERE id = $4 AND ownerId = $5 returning *`;
     try {
       const { rows } = await pool.query(findOneQuery, [req.params.id, req.user.id]);
       if(!rows[0]) {
         return res.status(404).send({'message': 'group not found'});
       }
       const values = [
         req.body.name || rows[0].name,
         req.body.role || rows[0].role,
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


// SEND MESSAGE TO GROUP
async createGroupMessage(req, res) {
    const text = `INSERT INTO
      groupMessages(subject, message, parentMessageId, status, senderId, groupId, createdOn)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.subject,
      req.body.message,
      uuidv4(),
      req.body.status,
      req.user.id,
      req.params.groupId,
      moment().format('LL')
    ];

    try {
      const checkUser = await pool.query('SELECT * FROM groups WHERE id = $1', [req.params.groupId]);

      if (checkUser.rows.length <= 0) {
        return res.status(404).json({
          status: 404,
          error: 'Sorry, this group doesn\'t exist',
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

  // DELETE A GROUP I OWN
  async deleteGroup(req, res) {
    const deleteQuery = 'DELETE FROM groups WHERE id = $1 AND ownerId = $2 RETURNING *';
    try {
       const {
         rows
       } = await pool.query(deleteQuery, [req.params.id, req.user.id]);

       if (rows.length > 0) {
         return res.json({
           status: 204,
           message: 'group deleted !',
         });
       }

       return res.status(404).json({
         status: 404,
         error: 'group doesn\'t exist',
       });
     } catch (error) {
       console.log(error)
     }
  }
}

export default Group;
