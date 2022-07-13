const db = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [data] = await db.execute(query);
  return data;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?;';
  const [data] = await db.execute(query, [id]);
  return data;
};

const add = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [{ insertId }] = await db.execute(query, [name]);
  return { name, id: insertId };
};

const update = async (name, id) => { 
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  const [product] = await db.execute(query, [name, id]);
  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};