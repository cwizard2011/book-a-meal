import chai from 'chai';
import request from 'supertest';
import app from '../../app';


const { expect } = chai;

describe('GET /api/v1/orders', () => {
  it('should return all orders', async () => {
    const res = await request(app)
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.orders).to.be.an('array');
    expect(res.body.orders.length).to.eql(2);
  });
});
describe('POST /api/v1/orders', () => {
  it('should not post an order with no Id', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(invalid1)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Order id is required');
  });
  it('should not post an order with no customer id', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(invalid2)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Customer Id is required');
  });
  it('should not post an order with no meal name', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(invalid3)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Name of meal is required');
  });
  it('should not post an order with no total', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(invalid4)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Order total is required');
  });
  it('should not post an existing order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(existOrder)
      .expect(409);

    expect(res.body.message)
      .to.equal('Order already exist');
  });
  it('should post a new order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(newOrder1)
      .expect(201);
    expect(res.body.order).to.have.a.property('orderId');
    expect(res.body.order).to.have.a.property('customerId');
    expect(res.body.order).to.have.a.property('mealName');
    expect(res.body.order).to.have.a.property('total');
  });
  it('should post a new order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(newOrder2)
      .expect(201);
    expect(res.body.order).to.have.a.property('orderId');
    expect(res.body.order).to.have.a.property('customerId');
    expect(res.body.order).to.have.a.property('mealName');
    expect(res.body.order).to.have.a.property('total');
  });
});

describe('PUT /api/orders/:orderId', () => {
  it('should not edit order if id does not exist', async () => {
    const orderId = 18;
    await request(app)
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(editOrder)
      .expect(404);
  });
  it('should not edit order with valid', async () => {
    const orderId = 1;
    await request(app)
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(editOrder)
      .expect(200);
  });
});
