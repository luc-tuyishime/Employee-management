import express from 'express';

import Contact from '../controllers/contacts';

import { jsonParser } from '../helpers/bodyParser';

const contactRouter = express.Router();

contactRouter.route('/:id')
  .get(Contact.getOne)
  .put(jsonParser, Contact.update)
  .delete(Contact.delete);

contactRouter.route('/')
  .get(Contact.getAll)
  .post(jsonParser, Contact.create);

export default contactRouter;
