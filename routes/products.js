const { Router } = require('express');
const products = require('../controllers/productsController');

const productsRouters = Router();

productsRouters.get('/', products.getAll);
productsRouters.get('/:id', products.getById);
productsRouters.post('/', () => { });

module.exports = productsRouters;
