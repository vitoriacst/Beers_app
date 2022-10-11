const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string()
    .min(12)
    .required()
    .messages({
      'string.base': '422|name must be a valid format',
      'string.min': '400|name must have at least 12 characters',
      'any.required': '400|name is required',
    }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br', 'org'] } })
    .required()
    .messages({
      'string.email': '422|email must be a valid format',
      'any.required': '400|email or password is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': '422|password must be a valid format',
      'string.min': '400|password must have at least 6 characters',
      'any.required': '400|email or password is required',
    }),
});

module.exports = registerSchema;
