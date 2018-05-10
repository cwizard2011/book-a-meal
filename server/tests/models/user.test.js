import chai from 'chai';
import User from '../../services/User';

const { expect } = chai;

describe('User Model', async () => {
  it('should create a new user', (done) => {
    User.createUser(
      'newuser', 'peter', 'adeola', '123dahsf5', 'new@valid.com', 'admin', '08079851757', 
      (users) => {
        expect(users).to.have.a.property('username');
        expect(users).to.have.a.property('email');
        expect(users).to.have.a.property('role');
        expect(users).to.have.a.property('phoneNumber');
        done();
      }
    );
  });
});
