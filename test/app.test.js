const request = require('supertest');
const app = require('../app');

describe('Node.js application', () => {
  it('should return the home page response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Application running');
  });

  it('should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});
