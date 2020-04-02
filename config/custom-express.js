const express = require('express');
const app = express();

module.exports = app;

const rotas = require('../controllers/pagamentos'); // ou const rotas = require('../controllers/pagamentos')(app);
rotas(app);
