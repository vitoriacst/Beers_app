const express = require('express');
const cors = require('cors');
const { errorTreatment } = require('../middlewares/errors/general.error');
require('express-async-errors');

const loginRouter = require('../routes/login.routes');
const customerRouter = require('../routes/customer.routes');
const sellerRouter = require('../routes/seller.routes');

const app = express();
app.use(express.json());
app.use((cors({ origin: '*' })));

// Entregando arquivos estáticos no Express
// https://expressjs.com/pt-br/starter/static-files.html

app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRouter);
app.use('/customer', customerRouter);
app.use('/seller', sellerRouter);

app.use(errorTreatment);

module.exports = app;
