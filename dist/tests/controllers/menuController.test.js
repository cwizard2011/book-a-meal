'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _menus = require('../seedData/menus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('GET /api/v1/menus', () => {
  it('should get all menus', done => {
    (0, _supertest2.default)(_app2.default).get('/api/v1/menus').set('Accept', 'application/json').expect(200).expect(res => {
      (0, _expect2.default)(res.body).toBeTruthy();
    }).end(err => {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});

describe('POST /api/v1/menus', () => {
  it('should not post a menu with invalid menu name', done => {
    (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send({ invalid4: _menus.invalid4 }).expect(400).end(err => {
      if (err) {
        return done(err);
      }
    });
    done();
  });
  it('should not post a menu without a date', done => {
    (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send({ invalid1: _menus.invalid1 }).expect(400).end(err => {
      if (err) {
        return done(err);
      }
    });
    done();
  });
  it('should not post a menu without menu name', done => {
    (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send({ invalid2: _menus.invalid2 }).expect(400).end(err => {
      if (err) {
        return done(err);
      }
    });
    done();
  });
  it('should not post a menu without meal', done => {
    (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send({ invalid3: _menus.invalid3 }).expect(400).end(err => {
      if (err) {
        return done(err);
      }
    });
    done();
  });
  it('should post a new menu', done => {
    (0, _supertest2.default)(_app2.default).post('/api/v1/menus').set('Accept', 'application/json').send({ valid: _menus.valid }).expect(205).expect(res => {
      (0, _expect2.default)(res.body).toEqual(_menus.valid);
    });
    done();
  });
});
//# sourceMappingURL=menuController.test.js.map