'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _meal = require('../seedData/meal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { expect } = _chai2.default;

describe('GET /api/v1/meals', () => {
  it('should return all meals', async () => {
    const res = await (0, _supertest2.default)(_app2.default).get('/api/v1/meals').set('Accept', 'application/json').expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body.meals).to.be.an('array');
    expect(res.body.meals.length).to.eql(3);
  });
});
describe('GET /api/v1/meals/:mealId', () => {
  it('should not return meal with invalid id', async () => {
    const mealId = 7;
    await (0, _supertest2.default)(_app2.default).get(`/api/v1/meals/${mealId}`).set('Accept', 'application/json').expect(404);
  });
  it('should return meal with valid id', async () => {
    const mealId = 2;
    const res = await (0, _supertest2.default)(_app2.default).get(`/api/v1/meals/${mealId}`).set('Accept', 'application/json').expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.a.property('mealId');
    expect(res.body.mealId).to.be.a('number');
    expect(res.body).to.have.a.property('mealName');
    expect(res.body.mealName).to.equal('Fried Rice, Salad and Beef');
    expect(res.body).to.have.a.property('description');
    expect(res.body.description).to.equal('Hot fried rice with salad, salad cream and Beef with option of malt or wine');
    expect(res.body).to.have.a.property('mealAvatar');
    expect(res.body.mealAvatar).to.equal('imageurl2');
    expect(res.body).to.have.a.property('price');
    expect(res.body.price).to.equal('# 1300');
  });
});
describe('POST /api/v1/meals', () => {
  it('should not post a meal with no Id', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.invalid1).expect(400);

    expect(res.body.errors[0].msg).to.equal('id is required');
  });
  it('should not post a meal with no meal name', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.invalid2).expect(400);

    expect(res.body.errors[0].msg).to.equal('Meal name is required');
  });
  it('should not post a meal with no price', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.invalid3).expect(400);

    expect(res.body.errors[0].msg).to.equal('Price of meal is required');
  });
  it('should not post a meal with no meal description', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.invalid4).expect(400);

    expect(res.body.errors[0].msg).to.equal('Meal description is required');
  });
  it('should not post a meal with no meal avatar', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.invalid5).expect(400);

    expect(res.body.errors[0].msg).to.equal('Image of meal is required');
  });
  it('should not post a meal with existing meal Id', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.existMeal1).expect(400);

    expect(res.body.message).to.equal('Meal or this Meal Id already exist');
  });
  it('should not post a meal with existing meal name', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.existMeal2).expect(400);

    expect(res.body.message).to.equal('Meal or this Meal Id already exist');
  });
  it('should post a new meal', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/meals').set('Accept', 'application/json').send(_meal.meal).expect(201);
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
    await (0, _supertest2.default)(_app2.default).put(`/api/v1/meals/${mealId}`).set('Accept', 'application/json').send(_meal.newMeal).expect(404);
  });
  it('should not edit meal if id does not exist', async () => {
    const mealId = 1;
    await (0, _supertest2.default)(_app2.default).put(`/api/v1/meals/${mealId}`).set('Accept', 'application/json').send(_meal.newMeal).expect(204);
  });
});
describe('DELETE /api/v1/meals/:mealId', () => {
  it('should not delete meal with invalid mealId', async () => {
    const mealId = 5;
    await (0, _supertest2.default)(_app2.default).delete(`/api/v1/meals/${mealId}`).set('Accept', 'application/json').expect(404);
  });
  it('should not delete meal with valid mealId', async () => {
    const mealId = 1;
    await (0, _supertest2.default)(_app2.default).delete(`/api/v1/meals/${mealId}`).set('Accept', 'application/json').expect(204);
  });
});
//# sourceMappingURL=mealController.test.js.map