import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { createApp } from '../app';
import products from '../data/products';
import orders from '../data/orders';

const app = createApp({ delay: false });
const initialStock = products.map((product) => product.stock);

beforeEach(() => {
  products.forEach((product, index) => {
    product.stock = initialStock[index]!;
  });
  orders.length = 0;
});

describe('POST /checkout', () => {
  it('cria um pedido com sucesso e decrementa o estoque', async () => {
    const product = products[0]!;
    const stockBefore = product.stock;

    const response = await request(app)
      .post('/checkout')
      .send({ productId: product.id, quantity: 2 });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: 'pending',
      product_id: product.id,
      quantity: 2,
      total_price: product.price * 2,
    });
    expect(product.stock).toBe(stockBefore - 2);
  });

  it('retorna 400 quando productId não é um número', async () => {
    const response = await request(app)
      .post('/checkout')
      .send({ productId: 'abc', quantity: 1 });

    expect(response.status).toBe(400);
  });

  it('retorna 400 quando quantity não é um inteiro positivo', async () => {
    const product = products[0]!;

    const response = await request(app)
      .post('/checkout')
      .send({ productId: product.id, quantity: 0 });

    expect(response.status).toBe(400);
  });

  it('retorna 404 quando o produto não existe', async () => {
    const response = await request(app)
      .post('/checkout')
      .send({ productId: 999999, quantity: 1 });

    expect(response.status).toBe(404);
  });

  it('retorna 400 quando a quantidade excede o estoque disponível', async () => {
    const product = products[0]!;

    const response = await request(app)
      .post('/checkout')
      .send({ productId: product.id, quantity: product.stock + 1 });

    expect(response.status).toBe(400);
    expect(product.stock).toBe(initialStock[0]);
  });

  it('não vende mais do que o estoque disponível sob concorrência', async () => {
    const product = products[0]!;
    product.stock = 1;

    const [first, second] = await Promise.all([
      request(app).post('/checkout').send({ productId: product.id, quantity: 1 }),
      request(app).post('/checkout').send({ productId: product.id, quantity: 1 }),
    ]);

    const statuses = [first.status, second.status].sort();
    expect(statuses).toEqual([201, 400]);
    expect(product.stock).toBe(0);
  });
});
