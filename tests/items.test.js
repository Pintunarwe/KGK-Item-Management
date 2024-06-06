const request = require('supertest');
const app = require('../src/app'); // Adjust the path accordingly

describe('Item CRUD Operations', () => {
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

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Item',
        description: 'This is a test item',
        startingBid: 100
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a single item by ID', async () => {
    const res = await request(app).get('/items/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update an item', async () => {
    const res = await request(app)
      .put('/items/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Test Item'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Updated Test Item');
  });

  it('should delete an item', async () => {
    const res = await request(app)
      .delete('/items/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
