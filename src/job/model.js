const {
  Model,
  TEXT,
  DECIMAL,
  DATE,
  BOOLEAN,
} = require('sequelize');
const { sequelize } = require('../sequelize');

class Job extends Model {
  static mapRelations({ Contract }) {
    Job.belongsTo(Contract);
  }
}

Job.init(
  {
    description: {
      type: TEXT,
      allowNull: false,
    },
    price: {
      type: DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: BOOLEAN,
      default: false,
    },
    paymentDate: {
      type: DATE,
    },
  },
  {
    sequelize,
    modelName: 'Job',
  },
);

module.exports = Job;
