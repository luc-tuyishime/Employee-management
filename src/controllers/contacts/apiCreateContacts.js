import moment from 'moment';
import { validateContact } from '../../helpers/validations/contact';

export const createContacts = (req, res, next) => {
  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }
  const contact = {
    id,
    createdOn: moment().format('LL'),
    email: req.body.email || '',
    firstname: req.body.firstname || '',
    lastname: req.body.lastname || 0,
  };
  contacts.push(contact);
  return res.send(({
    status: 201,
    data: [contact]
  }));
};
