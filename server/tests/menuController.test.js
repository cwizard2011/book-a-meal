import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// Global

const { expect } = chai;


const menu = {
  menuName: 'Fried rice',
  date: '22/01/21',
  meals: ['eba', 'beans', 'dodo'],
};


describe('/POST a menu', () => {

  it('it should Add(post) a new menu', () => {
    chai.request(app)
      .post('/api/v1/menu')
      .send(menu)
      .then((res) => {
        res.body.should.be.a('object');
        res.body.menu.eq(menu);
      });
  });
});

