const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const usersArray = [
      {
        firstName: 'Example',
        lastName: 'User',
        email: 'user@example.org',
        password: await bcrypt.hash('hola.123', PASSWORD_SALT_ROUNDS),
      },
      {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.org',
        password: await bcrypt.hash('hola.123', PASSWORD_SALT_ROUNDS),
      },
    ];

    const commonData = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert(
      'users',
      usersArray.map((user) => ({ ...user, ...commonData })),
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
