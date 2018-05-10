import chai from 'chai';
import request from 'supertest';
import app from '../../app';

const { expect } = chai;
let userToken;
let adminToken;
describe('Meal controller', () => {
  before(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'juliet',
        password: 'password123',
      });
    userToken = res.body.user.token;
  });
  before(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'peter',
        password: 'password123',
      });
    adminToken = res.body.user.token;
  });
  describe('GET /api/v1/meals', () => {
    it('should return error if user is not authenticated', async () => {
      const res = await request(app)
        .get('/api/v1/meals')
        .set('Accept', 'application/json')
        .expect(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Pls login with your username and password');
      expect(res.body).to.not.have.property('meals');
    });
    it('should return error if user is not an admin', async () => {
      const res = await request(app)
        .get('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', userToken)
        .expect(403);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message).to.equal('You are not authorized to access this resources');
    });
    it('should return all meals for admin', async () => {
      const res = await request(app)
        .get('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .expect(200);
      expect(res.body.message).to.equal('Meal found');
      expect(res.body).to.have.property('meals')
    });
  });
  describe('GET /api/v1/meals/:mealId', () => {
    it('should not return meal with invalid id', async () => {
      const mealId = 8;
      const res = await request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .expect(404);
      
      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message).to.equal('Can\'t get meal, meal not in database');

    });
    it('should return meal with valid id', async () => {
      const mealId = 1;
      const res = await request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .expect(200);
      expect(res.body).to.have.a.property('message');
      expect(res.body.message).to.equal('Meal found');
      expect(res.body).to.have.a.property('meals');
      expect(res.body.meals).to.be.an('object');
      expect(res.body.meals).to.have.a.property('id');
      expect(res.body.meals.id).to.be.a('number');
      expect(res.body.meals).to.have.a.property('mealName');
      expect(res.body.meals.mealName).to.equal('Jollof Rice');
      expect(res.body.meals).to.have.a.property('description');
      expect(res.body.meals.description).to
        .equal('Nigerian best food');
      expect(res.body.meals).to.have.a.property('mealAvatar');
      expect(res.body.meals.mealAvatar).to.equal('rice image');
      expect(res.body.meals).to.have.a.property('price');
      expect(res.body.meals.price).to.equal(500);
      expect(res.body.meals).to.have.a.property('userId');
      expect(res.body.meals.userId).to.equal(1);
    });
  });
  describe('POST /api/v1/meals', () => {
    it('should not post a meal with no meal name', async () => {
      const res = await request(app)
        .post('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          description: 'Nigerian best food',
          mealAvatar: 'rice image',
          price: 500,
          userId: 1,
          menuId: 1,
        })
        .expect(400);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('Meal name cannot be empty, please enter a meal name');
    });
    it('should not post a meal if user did not login', async () => {
      const res = await request(app)
        .post('/api/v1/meals')
        .set('Accept', 'application/json')
        .send({
          mealName: 'Chicken Rice',
          description: 'Nigerian best food',
          mealAvatar: 'rice image',
          price: 500,
          userId: 1,
        })
        .expect(401);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('Pls login with your username and password');
    });
    it('should not post a meal if user is not admin', async () => {
      const res = await request(app)
        .post('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', userToken)
        .send({
          mealName: 'Ponded yam',
          description: 'Nigerian best food',
          mealAvatar: 'meal image',
          price: 500,
          userId: 1,
        })
        .expect(403);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('You are not authorized to access this resources');
    });
    it('should not post a meal with no price', async () => {
      const res = await request(app)
        .post('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          mealName: 'Yam and egg source',
          description: 'Nigerian best food',
          mealAvatar: 'yam image',
          userId: 1,
        })
        .expect(400);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('Price should only contain digits, please enter a valid price');
    });
    it('should not post a meal with no meal description', async () => {
      const res = await request(app)
        .post('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          mealName: 'Yam and egg source',
          price: 800,
          mealAvatar: 'yam image',
          userId: 1,
        })
        .expect(400);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('description cannot be empty, please enter description');
    });
    it('should not post a meal with no meal avatar', async () => {
      const res = await request(app)
        .post('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          mealName: 'Yam and egg source',
          price: 800,
          description: 'Nigerian best food',
          userId: 1,
        })
        .expect(400);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('meal Avatar cannot be empty, please upload image');
    });
    it('should not post a meal with invalid price', async () => {
      const res = await request(app)
        .post('/api/v1/meals')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          mealName: 'Yam and egg source',
          price: '800a',
          description: 'Nigerian best food',
          mealAvatar: 'bdghfhb',
          userId: 1,
        })
        .expect(400);
    
      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('Price should only contain digits, please enter a valid price');
    });
  });

  describe('PUT /api/meals/:mealId', () => {
    it('should not edit meal if user did not sign in', async () => {
      const mealId = 1;
      const res = await request(app)
        .put(`/api/v1/meals/${mealId}`)
        .set('Accept', 'application/json')
        .send({
          mealName: 'Pounded yam',
          description: 'Nigerian best food',
          mealAvatar: 'yam image',
          price: 500,
        })
        .expect(401);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('Pls login with your username and password');
    });
    it('should not edit meal if user is not admin', async () => {
      const mealId = 1;
      const res = await request(app)
        .put(`/api/v1/meals/${mealId}`)
        .set('Accept', 'application/json')
        .set('token', userToken)
        .send({
          mealName: 'Pounded yam',
          description: 'Nigerian best food',
          mealAvatar: 'yam image',
          price: 500,
        })
        .expect(403);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('You are not authorized to access this resources');
    });
  });
  describe('DELETE /api/v1/meals/:mealId', () => {
    it('should not delete meal if not admin', async () => {
      const mealId = 1;
      const res = await request(app)
        .delete(`/api/v1/meals/${mealId}`)
        .set('Accept', 'application/json')
        .set('token', userToken)
        .expect(403);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('You are not authorized to access this resources');
    });
  });
});
