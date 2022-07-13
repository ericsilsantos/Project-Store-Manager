const salesServices = require('../services/salesServices');

const registerSalesProducts = async (req, res, next) => {
  try {
    const array = req.body;
    
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map (Promise.all)
    await Promise.all(array.map((sale) => salesServices.validadeSales(sale)));
    await Promise.all(array.map(async (sale) => {  
      const result = await salesServices.getById(sale.productId);
      if (!result || result.length === 0) throw new Error('Product not found');
      return result;
    }));

    const id = await salesServices.registerSales();
    const itemsSold = await Promise.all(array.map((sale) =>
      salesServices.registerSalesProducts(sale.productId, sale.quantity, id)));
  
    res.status(201).json({ id, itemsSold });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getById(id);
  if (!sale || sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();

  res.status(200).json(sales);
};

module.exports = { registerSalesProducts, getAll, getById };