import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products.router';
import checkoutRouter from './routes/checkout.router';

const app = express();

app.use(express.json());

app.use(cors())

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/products', productsRouter);
app.use('/checkout', checkoutRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});