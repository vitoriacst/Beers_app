const JwtService = require('../auth/JwtService');
const CustomError = require('../errors/custom.error');

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  // const { token } = req.body;

    try {
    const data = JwtService.verify(token);
    req.id = data.id;
    req.role = data.role;
    next();
  } catch (error) {
    throw new CustomError(401, 'Token not found');
  }
}

module.exports = validateToken;