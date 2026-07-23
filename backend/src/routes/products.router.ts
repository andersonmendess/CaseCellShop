import { Router, Request, Response } from 'express';

import products from '../data/products';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  return res.json(products);
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  return res.json(product);
});

export default router;