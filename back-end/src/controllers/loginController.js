const Login = require('../services/loginService');

module.exports = {
  async userLogin(req, res) {
    const loginInfo = req.body;

    const response = await Login.userLogin(loginInfo);
    return res.status(200).json({ response });
  },

  async registerUser(req, res) {
    const userInfo = req.body;

    const response = await Login.registerUser(userInfo);
    return res.status(201).json({ response });
  },
};
