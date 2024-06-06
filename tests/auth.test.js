const request = require('supertest');
const app = require('../src/app'); // Adjust the path accordingly

describe('User Registration and Login', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'pintu',
        password: '123',
        email: 'pintunarwe@gmail.com'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'pintunarwe@gmail.com',
        password: '123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
