const registerSchema = require('../schemas/register.schema');

function registerValidate(req, res, next) {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

module.exports = registerValidate;
