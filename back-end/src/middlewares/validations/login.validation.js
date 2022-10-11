const loginSchema = require('../schemas/login.schema');

function loginValidate(req, res, next) {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

module.exports = loginValidate;
