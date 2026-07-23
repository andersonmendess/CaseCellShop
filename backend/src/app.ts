import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products.router';
import checkoutRouter from './routes/checkout.router';
import { fakeDelay } from './middleware/fakeDelay';

export function createApp({ delay = true }: { delay?: boolean } = {}) {
  const app = express();

  app.use(express.json());

  app.use(cors());

  if (delay) {
    app.use(fakeDelay(1000));
  }

  app.get('/', (_req, res) => {
    res.json({ message: 'Hello World!' });
  });

  app.use('/products', productsRouter);
  app.use('/checkout', checkoutRouter);

  return app;
}
