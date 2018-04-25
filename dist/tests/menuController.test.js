'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

// Global

const { expect } = _chai2.default;

const menu = {
  menuName: 'Fried rice',
  date: '22/01/21',
  meals: ['eba', 'beans', 'dodo']
};

describe('/POST a menu', () => {

  it('it should Add(post) a new menu', () => {
    _chai2.default.request(_app2.default).post('/api/v1/menu').send(menu).then(res => {
      res.body.should.be.a('object');
      res.body.menu.eq(menu);
    });
  });
});
//# sourceMappingURL=menuController.test.js.map