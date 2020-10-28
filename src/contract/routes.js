const express = require('express');
const { getProfile } = require('../middleware/getProfile');
const { getQueryParams } = require('../middleware/getQueryParams');
const ContractController = require('./controller');

const router = express.Router();

/**
 * Get contract by id
 * @returns contract by id
 */
router.get('/contracts/:id', getProfile, ContractController.getById);
router.get('/contracts', getProfile, getQueryParams, ContractController.findByProfile);

module.exports = router;
