import chai from 'chai';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

describe('POST /api/v1/menus', () => {
  it('should create a new menu', () => {
    const menu = {
      menuName: 'Fried rice',
      date: '22/01/21',
      meals: ['eba', 'beans', 'dodo'],
    };
    const res = request(app)
      .post('/api/v1/menus')
      .set('content-type', 'application/json')
      .send({ menu })
      .expect(201);
    expect(res.body).to.be.an('object');
    expect(res.body.menu).to.equal(menu);
  });
});
