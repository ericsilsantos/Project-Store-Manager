const Joi = require('joi');
const salesModel = require('../models/salesModels');

const validadeSales = async (sale) => {
  // console.warn(sale);
  const schema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().integer().required().min(1),
  });
  // const data =
  await schema.validateAsync(sale);
  // return data;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale || sale.length === 0) throw new Error('Product not found');
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

module.exports = { registerSalesProducts, registerSales, validadeSales, getById };