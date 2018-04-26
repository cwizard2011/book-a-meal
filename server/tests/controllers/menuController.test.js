import chai from 'chai';
import app from '../../app';

chai.use(require('chai-http'));

const { expect } = chai.expect;


describe('GET /api/v1/menus', () => {
  it('should get all menus', () => {
    chai.request(app)
      .post('/api/v1/menus')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.meals).to.be.an('array');
      });
  });
});
