'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('POST /api/v1/menus', () => {
  it('should create a new menu', () => {
    const menu = {
      menuName: 'new menu2',
      date: '22/05/18',
      meals: ['rice', 'dodo', 'yam']
    };
    (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('accept', 'application/json').send({ menu }).expect(201).expect(res => {
      (0, _expect2.default)(res.body.menu).toEqual(menu);
    });
  });
  it('should not post menu if one of the key is missing', done => {
    const menu = {
      date: '22/05/18',
      meals: ['rice', 'dodo', 'yam']
    };
    (0, _supertest2.default)(_app2.default).post('/api/v1/menus').send({ menu }).expect(400).end(err => done(err));
  });
});

// describe('GET /api/v1/menus', () =>)
//# sourceMappingURL=menuController.test.js.map