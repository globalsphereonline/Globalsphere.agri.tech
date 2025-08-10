
const request = require('supertest');
const app = require('../src/index');

describe('Unit: Products endpoints', () => {
  test('GET /api/products returns products array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('products');
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  test('GET /api/products/:id returns product', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id',1);
  });
});
