/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

function postDataValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string()      
      .min(2)
      .max(30)
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    phone: Joi.string()
      .pattern(new RegExp('^[-+0-9]{5,20}$'))
      .min(7)
      .max(15)
      .required(),
    
    favorite: Joi.boolean()
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ status: error.details });
  }

  next();
}


function putDataValidation (req, res, next) {
  const schema = Joi.object({
    name: Joi.string()      
      .min(2)
      .max(30)
      .optional(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .optional(),

    phone: Joi.string()
      .pattern(new RegExp('^[-+0-9]{5,20}$'))     
      .optional(),
    
    favorite: Joi.boolean()
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ status: error.details });
  }

  next();
}

module.exports = {
    postDataValidation,
    putDataValidation
}