const { Router } = require('express');

const Login = require('../controllers/loginController');
const loginValidate = require('../middlewares/validations/login.validation');
const registerValidate = require('../middlewares/validations/register.validation');

const router = Router();

router.post('/login', loginValidate, Login.userLogin);
router.post('/register', registerValidate, Login.registerUser);

module.exports = router;
