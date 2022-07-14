const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');

module.exports = () => {
  const app = express();

  app.use(express.static(__dirname + '/../src/public/images'));

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));
  
  // MIDDLEWARES
  app.use(bodyParser.json());

  // ENDPOINTS
  consign({cwd: 'src'})
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};