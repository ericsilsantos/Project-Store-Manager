const { Router } = require('express');
const products = require('../controllers/productsController');

const productsRouters = Router();

productsRouters.get('/', products.getAll);
productsRouters.get('/:id', products.getById);
productsRouters.post('/', products.add);
productsRouters.put('/:id', products.update);

module.exports = productsRouters;
