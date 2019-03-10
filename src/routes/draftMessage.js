import express from 'express';

import draftMessage from '../controllers/draftMessage';

import { jsonParser } from '../helpers/bodyParser';

const draftMessageRouter = express.Router();


draftMessageRouter.route('/')
  .post(jsonParser, draftMessage.create);

  draftMessageRouter.route('/:id')
    .delete(draftMessage.delete);

export default draftMessageRouter;
