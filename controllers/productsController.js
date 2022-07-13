const service = require('../services/produtcsServices');

const ZERO = 0;

const getAll = async (_req, res) => {
  try {
    const data = await service.getAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ messege: error });
  }
};

const getById = async (req, res) => {
  const { id } = req.params; 
  const data = await service.getById(id);
  if (!data || data.length === ZERO) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(data);
};

const add = async (req, res, next) => {
  try {
    const { name } = await service.validationName(req.body);
    const product = await service.add(name);
    res.status(201).json(product);
  } catch (error) {
    // res.status(400).json({ message: error });
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await service.getById(id);
    if (!data || data.length === ZERO) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const { name } = await service.validationName(req.body);
    
    const updateID = await service.update(name, id);
    res.status(200).json({ id: updateID, name });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
try {
  const { id } = req.params;
  const data = await service.getById(id);
  if (!data || data.length === ZERO) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await service.deleteProduct(id);
  res.status(204).json();
} catch (error) {
  next(error);
}
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteProduct,
};