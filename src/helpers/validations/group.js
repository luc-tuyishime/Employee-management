import Joi from 'joi';

const validateGroup = {
  async validate(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().alphanum().min(3),
      role: Joi.string().alphanum().min(4),
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

export default validateGroup;
