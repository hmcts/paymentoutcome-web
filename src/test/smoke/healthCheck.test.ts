import request from 'supertest';

const frontend = process.env.TEST_URL || 'http://localhost:8080';

describe('paymentoutcome web health check', () => {
  it('should return a 200 status', async () => {
    await request(frontend)
      .get('/health')
      .expect((res) => expect(res.status).toBe(200));
  });

  it('should return status UP', async () => {
    await request(frontend)
      .get('/health')
      .expect((res) => expect(res.body.status).toBe('UP'));
  });
});
