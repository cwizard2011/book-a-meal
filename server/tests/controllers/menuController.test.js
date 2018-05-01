import chai from 'chai';
import request from 'supertest';
import app from '../../app';
import { valid, invalid1, invalid2, invalid3, invalid4 } from '../seedData/menus';

const { expect } = chai;

describe('GET /api/v1/menus', () => {
  it('should get all menus', async () => {
    const res = await request(app)
      .get('/api/v1/menus')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.menus).to.be.an('array');
  });
});
describe('POST /api/v1/menus', () => {
  it('should not post a menu with invalid menu name', async () => {
    await request(app)
      .post('/api/v1/menus')
      .set('Accept', 'application/json')
      .send(invalid4)
      .expect(400);
  });
  it('should not post a menu without a date', async () => {
    const res = await request(app)
      .post('/api/v1/menus')
      .set('Accept', 'application/json')
      .send(invalid1)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Date of menu is required');
  });
  it('should not post a menu without a menu name', async () => {
    const res = await request(app)
      .post('/api/v1/menus')
      .set('Accept', 'application/json')
      .send(invalid2)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Menu name is required');
  });
  it('should not post a menu without meals', async () => {
    const res = await request(app)
      .post('/api/v1/menus')
      .set('Accept', 'application/json')
      .send(invalid3)
      .expect(400);

    expect(res.body.errors[0].msg)
      .to.equal('Meals on menu are required');
  });
  it('should post a new menu', async () => {
    const res = await request(app)
      .post('/api/v1/menus')
      .set('Accept', 'application/json')
      .send(valid)
      .expect(201);
    expect(res.body.menu).to.have.a.property('menuName');
    expect(res.body.menu).to.have.a.property('date');
    expect(res.body.menu).to.have.a.property('meals');
    expect(res.body.menu.meals).to.be.an('array');
  });
});
