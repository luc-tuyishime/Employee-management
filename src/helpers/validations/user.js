import Joi from 'joi';


const validateUser = {
  async validate(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().alphanum().min(3).max(30)
        .required(),
      nationalId: Joi.string().required(),
      phone: Joi.string().regex(/^\+\d{1,12}$/).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      birth: Joi.date().max('1-1-2004').iso(),
      status: Joi.string().alphanum().min(6)
        .max(8)
        .required(),
      position: Joi.string().alphanum().min(7)
        .max(10),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
    }
    next();
  },
};

export default validateUser;
