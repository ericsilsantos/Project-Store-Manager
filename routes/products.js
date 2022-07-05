const { Router } = require('express');
const products = require('../controllers/productsController');

const productsRouters = Router();

productsRouters.get('/', products.getAll);
productsRouters.get('/:id', products.getById);
productsRouters.post('/', (_req, res) => res.status(200).json('aqui'));

module.exports = productsRouters;
