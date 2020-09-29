const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const helmet = require('helmet');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(helmet());

  // MIDDLEWARES
  app.use(bodyParser.json());

  // ROTAS
  consign({ cwd: 'api' }).then('controller').then('model').then('routes').into(app);

  return app;
};