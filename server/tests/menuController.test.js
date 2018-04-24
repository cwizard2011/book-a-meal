import chai from 'chai';
import request from 'supertest';
import app from '../app';
import menus from '../data/menus';

const { expect } = chai;

describe('POST /api/v1/menus', () => {
  it('should create a new menu', () => {
    const menu = {
        menuName: 'Jollof rice',
        date: '22/01/19',
        meals: ['rice', 'beans', 'plantain'],
      }
    const res = request(app)
    .post('/api/v1/menus')
    .set('Accept', 'application/json')
    .send({menu})
    .expect(201);
       expect(res.body).to.be.an('object');
      expect(res.body.menu).to.have.a.property('menuName');
      expect(res.body.menu).to.have.a.property('date');
      expect(res.body.menu).to.have.a.property('meals');
      expect(res.body.menu).to.equal(menu);
  });
});
