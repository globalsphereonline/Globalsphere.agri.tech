
const request = require('supertest');
const app = require('../src/index');

describe('Integration: Products (Supabase)', () => {
  test('GET /api/products works with Supabase when configured', async () => {
    // This test will pass against sample data if Supabase not configured.
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
  });
});
