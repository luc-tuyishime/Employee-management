import jwt from 'jsonwebtoken';
import db from '../models/connect';

const Auth = {
  async verifyToken(req, res, next) {

    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 401,
        'message': 'Access denied..'
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);

      const text = 'SELECT * FROM managers WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      const [value] = rows;
      const { position } = value;
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          'message': 'The token you provided is invalid'
        });
      }
      req.user = { id: decoded.userId, position };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;
