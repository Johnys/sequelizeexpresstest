const {
  Model,
  STRING,
  DECIMAL,
  ENUM,
} = require('sequelize');
const { sequelize } = require('../sequelize');

class Profile extends Model {
  static mapRelations({ Contract }) {
    Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
    Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
  }

  static getById(id) {
    return Profile.findOne({ where: { id } });
  }
}

Profile.init(
  {
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    profession: {
      type: STRING,
      allowNull: false,
    },
    balance: {
      type: DECIMAL(12, 2),
    },
    type: {
      type: ENUM('client', 'contractor'),
    },
  },
  {
    sequelize,
    modelName: 'Profile',
  },
);

module.exports = Profile;
