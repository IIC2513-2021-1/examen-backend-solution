const { QueryTypes } = require('sequelize');

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
    const statsArray = [];

    const commonData = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    async function findCompanyIdByName(name) {
      const companies = await queryInterface.sequelize.query(
        'SELECT "id" FROM "companies" WHERE "companies"."name" = ?',
        {
          replacements: [name],
          type: QueryTypes.SELECT,
        },
      );

      const [companyId] = companies.map(({ id }) => id);
      return companyId;
    }

    let companyId = await findCompanyIdByName('Blue Origin');

    if (companyId) {
      statsArray.push({
        flightsQuantity: 15,
        vehicleType: 'Rocket',
        maxAltitude: 100,
        hasEscapeSystem: true,
        crewedFlightOn: '2021-07-20',
        requiresPilot: false,
        passengersQuantity: 6,
        landingType: 'Parachute',
        companyId,
      });
    }

    companyId = await findCompanyIdByName('Virgin Galactic');

    if (companyId) {
      statsArray.push({
        flightsQuantity: 3,
        vehicleType: 'High altitude airplane',
        maxAltitude: 85,
        hasEscapeSystem: false,
        crewedFlightOn: '2021-07-11',
        requiresPilot: true,
        passengersQuantity: 4,
        landingType: 'Plane-like',
        companyId,
      });
    }

    return queryInterface.bulkInsert(
      'stats',
      statsArray.map((stats) => ({ ...stats, ...commonData })),
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('stats', null, {});
  },
};
