const Joi = require('joi');
const model = require('../models/productsModels');

const validationName = async (name) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
  });
  const result = await schema.validateAsync(name);
  return result;
};

const getAll = async () => {
  const products = await model.getAll();
  return products;
};

const getById = async (id) => {
  const [product] = await model.getById(id);
  return product;
};

const add = async (name) => {
  const product = await model.add(name);
  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  validationName,
};