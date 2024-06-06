const request = require('supertest');
const app = require('../src/app'); // Adjust the path accordingly

describe('Notification Operations', () => {
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

  it('should get notifications for the user', async () => {
    const res = await request(app)
      .get('/notifications')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should mark notifications as read', async () => {
    const res = await request(app)
      .post('/notifications/mark-read')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
