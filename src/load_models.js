const Contract = require('./contract/model');
const Job = require('./job/model');
const Profile = require('./profile/model');

class LoadModules {
  static init() {
    Contract.mapRelations({ Profile, Job });
    Job.mapRelations({ Contract });
    Profile.mapRelations({ Contract });
  }
}

module.exports = LoadModules;
