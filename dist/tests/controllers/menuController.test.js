'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _menus = require('../seedData/menus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { expect } = _chai2.default;

describe('GET /api/v1/menus', () => {
  it('should get all menus', async () => {
    const res = await (0, _supertest2.default)(_app2.default).get('/api/v1/menus').set('Accept', 'application/json').expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body.menus).to.be.an('array');
  });
});
describe('POST /api/v1/menus', () => {
  it('should not post a menu with invalid menu name', async () => {
    await (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send(_menus.invalid4).expect(400);
  });
  it('should not post a menu without a date', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send(_menus.invalid1).expect(400);

    expect(res.body.errors[0].msg).to.equal('Date of menu is required');
  });
  it('should not post a menu without a menu name', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send(_menus.invalid2).expect(400);

    expect(res.body.errors[0].msg).to.equal('Menu name is required');
  });
  it('should not post a menu without meals', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send(_menus.invalid3).expect(400);

    expect(res.body.errors[0].msg).to.equal('Meals on menu are required');
  });
  it('should post a new menu', async () => {
    const res = await (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send(_menus.valid).expect(201);
    expect(res.body).to.be.an('object');
    expect(res.body.menu).to.have.a.property('menuName');
    expect(res.body.menu).to.have.a.property('date');
    expect(res.body.menu).to.have.a.property('meals');
    expect(res.body.menu.meals).to.be.an('array');
  });
});
//# sourceMappingURL=menuController.test.js.map