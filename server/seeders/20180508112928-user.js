const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const newpassword = bcrypt.hashSync('password123', salt);

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      username: 'peter',
      firstName: 'Peter',
      lastName: 'Adeoye',
      password: newpassword,
      email: 'cwizard@gmail.com',
      phoneNumber: '08079851757',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'juliet',
      firstName: 'Juliet',
      lastName: 'Samuel',
      password: newpassword,
      email: 'sjuliet@gmail.com',
      phoneNumber: '08069372623',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
