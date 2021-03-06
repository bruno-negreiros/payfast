var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
  var app = express();

  app.use(bodyParser.json());

  //Obrigatoriamente logo apos o bodyParser
  app.use(expressValidator());

  consign()
   .include('controllers')
   .then('persistencia')
   .then('servicos')
   .into(app);

  return app;
}
