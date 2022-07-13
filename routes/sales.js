const { Router } = require('express');
const salesServices = require('../controllers/salesControllers');

const salesRouters = Router();

salesRouters.post('/', salesServices.registerSalesProducts);

module.exports = salesRouters;