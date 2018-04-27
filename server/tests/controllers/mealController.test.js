import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import { meal, invalid1, invalid2, invalid3, invalid4, invalid5, existMeal1, existMeal2, newMeal } from '../seedData/meal';


const { expect } = chai;

describe('GET /api/v1/meals', () => {
  it('should return all meals', async () => {
    const res = await request(app)
      .get('/api/v1/meals')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body.meals).to.be.an('array');
    expect(res.body.meals.length).to.eql(3);
  });
});
describe('GET /api/v1/meals/:mealId', () => {
  it('should not return meal with invalid id', async () => {
    await request(app)
      .get('/api/v1/meals/:mealId')
      .set('Accept', 'application/json')
      .expect(404);
  });
  it('should return meal with valid id', async () => {
    const mealId = 2;
    const res = await request(app)
      .get(`/api/v1/meals/${mealId}`)
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.a.property('mealId');
    expect(res.body.mealId).to.be.a('number');
    expect(res.body).to.have.a.property('mealName');
    expect(res.body.mealName).to.equal('Fried Rice, Salad and Beef');
    expect(res.body).to.have.a.property('description');
    expect(res.body.description).to
      .equal('Hot fried rice with salad, salad cream and Beef with option of malt or wine');
    expect(res.body).to.have.a.property('mealAvatar');
    expect(res.body.mealAvatar).to.equal('imageurl2');
    expect(res.body).to.have.a.property('price');
    expect(res.body.price).to.equal('# 1300');
  });
});
describe('POST /api/v1/meals', () => {
  it('should not post a meal with no Id', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(invalid1)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('id is required');
  });
  it('should not post a meal with no meal name', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(invalid2)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Meal name is required');
  });
  it('should not post a meal with no price', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(invalid3)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Price of meal is required');
  });
  it('should not post a meal with no meal description', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(invalid4)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Meal description is required');
  });
  it('should not post a meal with no meal avatar', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(invalid5)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Image of meal is required');
  });
  it('should not post a meal with existing meal Id', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(existMeal1)
      .expect(400);

    expect(res.body.message)
      .to.equal('Meal or this Meal Id already exist');
  });
  it('should not post a meal with existing meal name', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(existMeal2)
      .expect(400);

    expect(res.body.message)
      .to.equal('Meal or this Meal Id already exist');
  });
  it('should post a new meal', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .send(meal)
      .expect(201);
    expect(res.body).to.be.an('object');
    expect(res.body.meal).to.have.a.property('mealName');
    expect(res.body.meal).to.have.a.property('mealId');
    expect(res.body.meal).to.have.a.property('price');
    expect(res.body.meal).to.have.a.property('description');
    expect(res.body.meal).to.have.a.property('mealAvatar');
  });
});

describe('PUT /api/meals/:mealId', () => {
  it('should not edit meal if id does not exist', async () => {
    const mealId = 18;
    await request(app)
      .put(`/api/v1/meals/${mealId}`)
      .set('Accept', 'application/json')
      .send(newMeal)
      .expect(404);
  });
  it('should not edit meal if id does not exist', async () => {
    const mealId = 1;
    await request(app)
      .put(`/api/v1/meals/${mealId}`)
      .set('Accept', 'application/json')
      .send(newMeal)
      .expect(204);
  });
});
describe('DELETE /api/v1/meals/:mealId', () => {
  it('should not delete meal with invalid mealId', async () => {
    const mealId = 5;
    await request(app)
      .delete(`/api/v1/meals/${mealId}`)
      .set('Accept', 'application/json')
      .expect(404);
  });
  it('should not delete meal with valid mealId', async () => {
    const mealId = 1;
    await request(app)
      .delete(`/api/v1/meals/${mealId}`)
      .set('Accept', 'application/json')
      .expect(204);
  });
});
