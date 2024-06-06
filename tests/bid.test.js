
const request = require('supertest');
const app = require('../src/app'); // Adjust the path accordingly

describe('Bid Operations', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'pintunarwe@gmail.com',
        password: '123'
      });
    token = res.body.token;
  });

  it('should place a new bid on an item', async () => {
    const res = await request(app)
      .post('/items/1/bids')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 150
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all bids for an item', async () => {
    const res = await request(app).get('/items/1/bids');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
