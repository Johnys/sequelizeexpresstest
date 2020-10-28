const Contract = require('./model');

class ContractService {
  static getContractByIdAndProfile({ contractId, profileId }) {
    return Contract.getContractByIdAndProfile({ contractId, profileId });
  }

  static findByProfile({ profileId, limit, page }) {
    return Contract.findByProfile({ profileId, limit, page });
  }
}

module.exports = ContractService;
