const Profile = require('./model');

class ProfileService {
  static getById(id) {
    return Profile.getById(id);
  }
}

module.exports = ProfileService;
