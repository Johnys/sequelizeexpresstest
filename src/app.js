const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./sequelize');
const LoadRoutes = require('./load_routes');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

LoadRoutes.init(app);

module.exports = app;
