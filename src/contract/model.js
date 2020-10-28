const {
  Op,
  Model,
  TEXT,
  ENUM,
} = require('sequelize');
const { sequelize } = require('../db');

class Contract extends Model {
  static mapRelations({ Profile, Job }) {
    Contract.belongsTo(Profile, { as: 'Contractor' });
    Contract.belongsTo(Profile, { as: 'Client' });
    Contract.hasMany(Job);
  }

  static getContractByIdAndProfile({ contractId, profileId }) {
    const query = {
      where: {
        id: contractId,
        [Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
    };
    return Contract.findOne(query);
  }

  static findByProfile({ profileId, limit, page }) {
    const query = {
      where: {
        [Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
      limit,
      offset: page - 1,
    };
    return Contract.findAll(query);
  }
}

Contract.init(
  {
    terms: {
      type: TEXT,
      allowNull: false,
    },
    status: {
      type: ENUM('new', 'in_progress', 'terminated'),
    },
  },
  {
    sequelize,
    modelName: 'Contract',
  },
);

module.exports = Contract;
