import request from 'supertest';
import app from '../app.js';

describe('User Controller', () => {
    let user1;
    describe('POST /api/v1/signup', () => {
        it('should add one user', async () => {
          const res = await request(app).post('/signup').send({
            firstName: 'test',
            lastName: 'user',
            email: 'user2@example.com',
            password: '12345678',
          });
          console.log(res.body)
          expect(res.statusCode).toBe(201);
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe('user1@example.com');
          user1 = res.body;
        }, 10000); // Set a timeout of 10 seconds (10000 milliseconds)
      });
      
    // describe('GET /api/v1/user/:id', () => {
    //     it('should return one user', async () => {
    //       const res = await request(server).get(`/api/v1/user/${user1.id}`);
    //       expect(res.statusCode).toBe(200);
    //       expect(res.body).toHaveProperty('id');
    //     });
    // });    

});  

