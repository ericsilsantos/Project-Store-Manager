const service = require('../services/produtcsServices');

const ZERO = 0;

const getAll = async (req, res) => {
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

module.exports = {
  getAll,
  getById,
};