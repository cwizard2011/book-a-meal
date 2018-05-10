import chai from 'chai';
import request from 'supertest';
import app from '../../app';


const { expect } = chai;
let userToken;
let adminToken;
describe('Menu controller', () => {
  before(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'juliet',
        password: 'password123',
      });
    userToken = res.body.user.token;
  });
  before(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'peter',
        password: 'password123',
      });
    adminToken = res.body.user.token;
  });
  describe('GET /api/v1/menus', () => {
    it('should not get menu if user did not login', async () => {
      const res = await request(app)
        .get('/api/v1/menus')
        .set('Accept', 'application/json')
        .expect(401);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('meals');
      expect(res.body.message)
        .to.equal('Pls login with your username and password');
    });
    it('should get menu for authorized users', async () => {
      const res = await request(app)
        .get('/api/v1/menus')
        .set('Accept', 'application/json')
        .set('token', userToken)
        .expect(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('menus');
      expect(res.body).to.have.a.property('message');
      expect(res.body.message).to.equal('Menu found');
      expect(res.body.menus[0]).to.have.a.property('menuName');
      expect(res.body.menus[0]).to.have.a.property('userId');
      expect(res.body.menus[0]).to.have.a.property('id');
      expect(res.body.menus[0]).to.have.a.property('date');
    });
  });
  describe('POST /api/v1/menus', () => {
    it('should not post if user not admin', async () => {
      const res = await request(app)
        .post('/api/v1/menus')
        .set('Accept', 'application/json')
        .set('token', userToken)
        .send({
          menuName: 'Delicious Menu 1',
          meals: ['jollof rice', 'fried rice', 'pounded yam and vegetable'],
          userId: 1,
          date: new Date(),
        })
        .expect(403);

      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('menus');
      expect(res.body.message).to.equal('You are not authorized to access this resources');
    });
    it('should post a new menu as admin', async () => {
      const res = await request(app)
        .post('/api/v1/menus')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          menuName: 'African pepper',
          meals: ['Semo and okro', 'Amala and Ewedu', 'Iyan and egusi'],
          userId: 2,
        })
        .expect(201);
      
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('menu');
      expect(res.body.message)
        .to.equal('Menu created');
    });
    it('should not post a menu without a menu name', async () => {
      const res = await request(app)
        .post('/api/v1/menus')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          userId: 1,
        })
        .expect(400);
      expect(res.body).to.have.property('message');
      expect(res.body).to.not.have.property('menus');
      expect(res.body.message)
        .to.equal('menu Name cannot be empty, please enter menu name');
    });
    it('should not post a menu without user Id', async () => {
      const res = await request(app)
        .post('/api/v1/menus')
        .set('Accept', 'application/json')
        .set('token', adminToken)
        .send({
          menuName: 'Chinese Dish'
        })
        .expect(400);

      expect(res.body.message)
        .to.equal('user id cannot be empty, please enter user id');
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
});
