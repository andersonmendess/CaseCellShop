import { Router, Request, Response } from 'express';

import products from '../data/products';
import orders from '../data/orders';
import { Order } from '../@types/order';

const router = Router();


router.post('/', async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  if (typeof productId !== 'number') {
    return res.status(400).json({ error: 'Produto inválido' });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: 'Quantidade inválida' });
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  if (quantity > product.stock) {
    return res.status(400).json({ error: 'Quantidade solicitada excede o estoque disponível' });
  }

  product.stock -= quantity;

  const order: Order = {
    id: orders.length + 1,
    status: 'pending',
    product_id: productId,
    user_id: 0,
    quantity,
    total_price: product.price * quantity,
    created_at: new Date(),
  };

  orders.push(order);

  return res.status(201).json(order);
});


export default router;