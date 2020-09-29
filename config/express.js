const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const mongoose = require('mongoose');
var dbConfig = require('./default.json');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MONGODB
  mongoose.connect(dbConfig.bd.host, { useNewUrlParser: true })

  // MIDDLEWARES
  app.use(bodyParser.json());

  // ROTAS
  consign({ cwd: 'api' }).then('data').then('controller').then('model').then('routes').into(app);

  return app;
};