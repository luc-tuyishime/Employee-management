import Joi from 'joi';

export const validateGroup = (message) => {
  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3),
    role: Joi.string().alphanum().min(4),
  });
  return Joi.validate(message, schema);
};
