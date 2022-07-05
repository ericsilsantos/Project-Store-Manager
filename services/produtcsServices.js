const model = require('../models/productsModels');

const getAll = async () => {
  const products = await model.getAll();
  return products;
};

const getById = async (id) => {
  const [product] = await model.getById(id);
  return product;
};

module.exports = {
  getAll,
  getById,
};