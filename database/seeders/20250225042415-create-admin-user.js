'use strict';
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 8);
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'Administrador',
      isActive: true,
      token: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { email: 'adminexample.com' }, {});
  }
};