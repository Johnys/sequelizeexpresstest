const ContractRoutes = require('./contract/routes');

class LoadRoutes {
  static init(app) {
    app.use('/', ContractRoutes);
  }
}

module.exports = LoadRoutes;
