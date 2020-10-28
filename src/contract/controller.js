const { HTTP_CODES } = require('../constants');
const ContractService = require('./service');

class ContractController {
  static async getById(req, res) {
    const { id } = req.params;
    const { profile } = req;
    const contract = await ContractService.getContractByIdAndProfile({ contractId: id, profileId: profile.id });
    if (!contract) return res.status(HTTP_CODES.NOT_FOUND).end();
    return res.json(contract);
  }

  static async findByProfile(req, res) {
    const { profile, limit, page } = req;

    const contracts = await ContractService.findByProfile({ profileId: profile.id, limit, page });
    return res.json(contracts);
  }
}

module.exports = ContractController;
