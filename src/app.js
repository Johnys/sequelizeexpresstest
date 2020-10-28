const express = require('express');
const bodyParser = require('body-parser');
const LoadRoutes = require('./load_routes');
const LoadModels = require('./load_models');

const app = express();
app.use(bodyParser.json());

LoadModels.init();
LoadRoutes.init(app);

module.exports = app;
