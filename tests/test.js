import request from 'supertest';
import app from '../app.js';

describe('User Controller', () => {
  let user = {};
  
  beforeEach(async () => {
      // Run this code before each test
      const res = await request(app).post('/api/v1/signup').send({
          firstName: 'Google',
          lastName: 'Bard',
          email: 'bard@google.com',
          password: '12345678',
      });
      user = res; // Update the user object
  });

  describe('POST /api/v1/signup', () => {
    it('should add one user', async () => {
      expect(user.statusCode).toBe(201);
      expect(user.body).toHaveProperty('id');
    });
  });

  describe('POST /api/v1/login', () => {
    it('should login', async () => {
      const beforeLoginDate = new Date();
      const res = await request(app).post('/api/v1/login').send({
        email: 'bard@google.com',
        password: '12345678',
      });
      console.log(res)
      expect(res.statusCode).toBe(201)  
      // expect(new Date(res.body.lastLogin).getTime()).toBeGreaterThanOrEqual(beforeLoginDate.getTime());
    });
  })


  // describe('GET /api/v1/user/:id', () => {
  //   it('should return one user', async () => {
  //     // Now, the user object is set before running this test
  //     const res = await request(app).get(`/api/v1/user/${user.body.id}`);
  //     console.log('user', res)
  //     expect(res.statusCode).toBe(200); // Should be 200 for successful retrieval
  //     expect(res.body).toHaveProperty('id');
  //   });
  // });
});


