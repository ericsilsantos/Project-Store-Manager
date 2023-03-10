const db = require('./connection');

const registerSales = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
  const [{ insertId }] = await db.execute(query);
  return insertId;
};

const registerSalesProducts = async (saleId, productId, quant) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES(?, ?, ?);`;
  await db.execute(query, [saleId, productId, quant]);
  return { productId, quantity: quant };
};

// const getById = async (id) => {
//   const query = 'SELECT * FROM StoreManager.sales WHERE id=?;';
//   const [sale] = await db.execute(query, [id]);
//   return sale;
// };
 
const getById = async (id) => {
  const query = `SELECT SA.date, SP.product_id AS 'productId', SP.quantity
  FROM StoreManager.sales_products AS SP
  INNER JOIN
  StoreManager.sales AS SA ON SP.sale_id = SA.id
  WHERE id = ?;`;
  const [sale] = await db.execute(query, [id]);
  return sale;
};

const getAll = async () => {
  const query = `SELECT SP.sale_id AS 'saleId', SA.date, SP.product_id AS 'productId', SP.quantity
  FROM StoreManager.sales_products AS SP
  INNER JOIN
  StoreManager.sales AS SA ON SP.sale_id = SA.id;`;
  const [sales] = await db.execute(query);
  return sales;
};

module.exports = {
  registerSales,
  registerSalesProducts,
  getById,
  getAll,
};