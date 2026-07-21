import { Router, Request, Response } from 'express';

import products from '../data/products';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.json(products);
});

export default router;