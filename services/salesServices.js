const Joi = require('joi');
const salesModel = require('../models/salesModels');

const validadeSales = async (sale) => {
  const schema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().integer().required().min(1),
  });
  await schema.validateAsync(sale);
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const registerSales = async () => {
  const saleId = await salesModel.registerSales();
  return saleId;
};

const registerSalesProducts = async (productId, quant, saleId) => {
  const salesProducts = await salesModel.registerSalesProducts(saleId, productId, quant);
  return salesProducts;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

module.exports = { registerSalesProducts, registerSales, validadeSales, getById, getAll };