'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _order = require('../seedData/order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { expect } = _chai2.default;

describe('GET /api/v1/orders', () => {
  it('should return all orders', async () => {
    const res = await (0, _supertest2.default)(_app2.default).get('/api/v1/orders').set('Accept', 'application/json').expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body.orders).to.be.an('array');
    expect(res.body.orders.length).to.eql(2);
  });
});
describe('POST /api/v1/orders', () => {
  it('should not post an order with no Id', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/orders').set('Accept', 'application/json').send(_order.invalid1).expect(400);

    expect(res.body.errors[0].msg).to.equal('Order id is required');
  });
  it('should not post an order with no customer id', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/orders').set('Accept', 'application/json').send(_order.invalid2).expect(400);

    expect(res.body.errors[0].msg).to.equal('Customer Id is required');
  });
  it('should not post an order with no meal name', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/orders').set('Accept', 'application/json').send(_order.invalid3).expect(400);

    expect(res.body.errors[0].msg).to.equal('Name of meal is required');
  });
  it('should not post an order with no total', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/orders').set('Accept', 'application/json').send(_order.invalid4).expect(400);

    expect(res.body.errors[0].msg).to.equal('Order total is required');
  });
  it('should not post an existing order', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/orders').set('Accept', 'application/json').send(_order.existOrder).expect(400);

    expect(res.body.message).to.equal('Order already exist');
  });
  it('should post a new order', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/orders').set('Accept', 'application/json').send(_order.newOrder1).expect(201);
    expect(res.body).to.be.an('object');
    expect(res.body.order).to.have.a.property('orderId');
    expect(res.body.order).to.have.a.property('customerId');
    expect(res.body.order).to.have.a.property('mealName');
    expect(res.body.order).to.have.a.property('total');
  });
  it('should post a new order', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/orders').set('Accept', 'application/json').send(_order.newOrder2).expect(201);
    expect(res.body).to.be.an('object');
    expect(res.body.order).to.have.a.property('orderId');
    expect(res.body.order).to.have.a.property('customerId');
    expect(res.body.order).to.have.a.property('mealName');
    expect(res.body.order).to.have.a.property('total');
  });
});

// describe('PUT /api/meals/:mealId', () => {
//   it('should not edit meal if id does not exist', async () => {
//     const mealId = 18;
//     await request(app)
//       .put(`/api/v1/meals/${mealId}`)
//       .set('Accept', 'application/json')
//       .send(newMeal)
//       .expect(404);
//   });
//   it('should not edit meal if id does not exist', async () => {
//     const mealId = 1;
//     await request(app)
//       .put(`/api/v1/meals/${mealId}`)
//       .set('Accept', 'application/json')
//       .send(newMeal)
//       .expect(204);
//   });
// });
// describe('DELETE /api/v1/meals/:mealId', () => {
//   it('should not delete meal with invalid mealId', async () => {
//     const mealId = 5;
//     await request(app)
//       .delete(`/api/v1/meals/${mealId}`)
//       .set('Accept', 'application/json')
//       .expect(404);
//   });
//   it('should not delete meal with valid mealId', async () => {
//     const mealId = 1;
//     await request(app)
//       .delete(`/api/v1/meals/${mealId}`)
//       .set('Accept', 'application/json')
//       .expect(204);
//   });
// });
//# sourceMappingURL=orderController.test.js.map