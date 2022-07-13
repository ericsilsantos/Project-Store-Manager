const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRouters = Router();

salesRouters.get('/', salesControllers.getAll);
salesRouters.get('/:id', salesControllers.getById);
salesRouters.post('/', salesControllers.registerSalesProducts);

module.exports = salesRouters;