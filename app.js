const express = require('express');
const errorHandle = require('./middlewares/errorMiddlewares');
const productsRouters = require('./routes/products');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouters);

app.use(errorHandle);
// app.listen('3000', () => {
//   console.log('Começando o projeto');
// });

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;