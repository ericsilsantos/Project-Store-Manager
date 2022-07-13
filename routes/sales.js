const { Router } = require('express');
const salesServices = require('../controllers/salesControllers');

const salesRouters = Router();

salesRouters.get('/', salesServices.getAll);
salesRouters.get('/:id', salesServices.getById);
salesRouters.post('/', salesServices.registerSalesProducts);

module.exports = salesRouters;