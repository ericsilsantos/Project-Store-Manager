const salesServices = require('../services/salesServices');

const registerSalesProducts = async (req, res, next) => {
  try {
    const array = req.body;
    
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map (Promise.all)
    await Promise.all(array.map((sale) => salesServices.validadeSales(sale)));
    await Promise.all(array.map((sale) => salesServices.getById(sale.productId)));

    const id = await salesServices.registerSales();
    const itemsSold = await Promise.all(array.map((sale) =>
      salesServices.registerSalesProducts(sale.productId, sale.quantity, id)));
  
    res.status(201).json({ id, itemsSold });
  } catch (error) {
    const { message } = error; 
    if (message === 'Product not found') return res.status(404).json({ message });
    next(error);
  }
};

module.exports = { registerSalesProducts };