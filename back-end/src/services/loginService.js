const md5 = require('md5');
const { Op } = require('sequelize');
const jwt = require('../middlewares/auth/JwtService');
const { User } = require('../database/models');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async userLogin(loginInfo) {
    const { email, password } = loginInfo;
  
    const hashedPwd = md5(password);
    const user = await User.findOne({ where: { email } });
  
    // if (!user || user.password !== hashedPwd) {
      // const error = new Error('Not found');
      // error.name = 'invalid login';
      // throw error;
    // }
    if (!user || user.password !== hashedPwd) {
      throw new CustomError(404, 'Not found');
    }

    const payload = { id: user.id, name: user.name, email, role: user.role };

    const token = jwt.sign(payload);
    const response = { ...payload, token };
    return response;
  },

  async registerUser(userInfo) {
    const { name, email, password } = userInfo;

    const user = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });

    if (user) throw new CustomError(409, 'Conflict - User already registered');

    const hashedPwd = md5(password);
    const role = 'customer';
    
    const newUser = await User.create({ name, email, password: hashedPwd, role });

    const payload = { id: newUser.id, name, email, role };
    const token = jwt.sign(payload);

    const response = { ...payload, token };
    return response;
  },
};
