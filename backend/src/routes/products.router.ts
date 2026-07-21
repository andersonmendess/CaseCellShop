import { Router, Request, Response } from 'express';

import products from '../data/products';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  setTimeout(() => {
    return res.json([...products,...products,...products]);
  }, 1000);
});

export default router;