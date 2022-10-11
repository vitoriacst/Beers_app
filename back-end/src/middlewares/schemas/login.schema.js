const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br', 'org'] } })
    .required()
    .messages({
      'string.empty': '400|All fields must be filled',
      'string.email': '422|email must be a valid format',
      'any.required': '400|email or password is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': '422|password must be a valid format',
      'string.empty': '400|All fields must be filled',
      'string.min': '400|password must have at least 6 characters',
      'any.required': '400|email or password is required',
    }),
});

module.exports = loginSchema;
