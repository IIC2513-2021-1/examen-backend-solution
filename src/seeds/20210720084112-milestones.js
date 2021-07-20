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
    let milestonesArray = [];

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
      const companyMilestonesArray = [
        {
          title: 'NASA Space Act Agreement funding',
          happenedAt: '2011-01-01',
          excerpt: 'Blue Origin received $22 million from NASA to develop a system to carry astronauts to the International Space Station.',
          companyId,
        },
        {
          title: 'First developmental test flight',
          happenedAt: '2015-04-29',
          excerpt: 'Blue Origin launched its first rocket in a Texas test facility. The crew capsule was recovered afterward, but the rocket was lost.',
          companyId,
        },
        {
          title: 'First ground landing of a reusable rocket',
          happenedAt: '2015-11-24',
          excerpt: 'Blue Origin was the first company to successfully vertically land a reusable rocket on the ground after a flight to space.',
          companyId,
        },
        {
          title: 'First reuse of a Blue Origin rocket',
          happenedAt: '2016-01-23',
          excerpt: 'Blue Origin reused a rocket that had made the trip to space for a second successful launch.',
          companyId,
        },
        {
          title: 'Blue Origin unveils New Glenn',
          happenedAt: '2016-09-12',
          excerpt: 'Blue Origin revealed its New Glenn orbital rocket, showing that it has ambitions for more than suborbital space tourism.',
          companyId,
        },
        {
          title: 'Crew Capsule 2.0 test flight',
          happenedAt: '2017-12-12',
          excerpt: 'The first test flight of Blue Origin’s Crew Capsule 2.0 carried 12 experiments to space, along with its first human-ish passenger — a test dummy dubbed Mannequin Skywalker.',
          companyId,
        },
        {
          title: 'Bezos joins the New Shepard crew',
          happenedAt: '2021-06-07',
          excerpt: 'Bezos announced that he would be aboard the first crewed Blue Origin flight, along with his brother Mark.',
          companyId,
        },
        {
          title: 'Liftoff for the first crewed New Shepard',
          happenedAt: '2021-07-20',
          excerpt: 'Blue Origin successfully launched its New Shepard rocket on Tuesday July 20 on its first crewed spaceflight, a historic step forward for private space tourism.',
          companyId,
        },
      ];

      milestonesArray = [...milestonesArray, ...companyMilestonesArray];
    }

    companyId = await findCompanyIdByName('Virgin Galactic');

    if (companyId) {
      const companyMilestonesArray = [
        {
          title: 'The Spaceship Company to build Virgin Galactic spaceships',
          happenedAt: '2005-01-01',
          excerpt: 'The Spaceship Company (TSC) was founded by Richard Branson through Virgin Group, and Burt Rutan through Scaled Composites, to build commercial spaceships and launch aircraft for space travel.',
          companyId,
        },
        {
          title: 'Scaled Composites fuel tank testing explosion',
          happenedAt: '2007-07-01',
          excerpt: 'Three Scaled Composite employees were killed and three critically injured at the Mojave spaceport while testing components of the rocket motor for SpaceShipTwo.',
          companyId,
        },
        {
          title: 'SpaceShipTwo was unveiled at the Mojave Spaceport',
          happenedAt: '2009-12-07',
          excerpt: 'Branson told that flights would begin "in 2011". By February 2012, SpaceShipTwo had completed 15 test flights attached to White Knight Two, and an additional 16 glide tests, the last of which took place in September 2011.',
          companyId,
        },
        {
          title: 'VSS Enterprise crash',
          happenedAt: '2014-10-31',
          excerpt: 'The fourth rocket-powered test flight of the company\'s first SpaceShipTwo craft, VSS Enterprise, ended in disaster, as it broke apart in mid-air, with the debris falling into the Mojave desert in California, shortly after being released from the mothership.',
          companyId,
        },
        {
          title: 'VSS Unity, the replacement SpaceShipTwo',
          happenedAt: '2016-02-19',
          excerpt: 'Test flights for VSS Unity were set to begin after ground tests completed in August 2016. VSS Unity completed its first flight, a successful glide test, in December 2016.',
          companyId,
        },
        {
          title: 'VSS Unity reaches space',
          happenedAt: '2018-12-13',
          excerpt: 'VSS Unity reached a height of 82.7 km above the Earth at speeds close to three times the speed of sound. The two pilots, Mark "Forger" Stucky and Frederick "CJ" Sturckow earned commercial astronaut wings from the US government for the accomplishment.',
          companyId,
        },
        {
          title: 'The first ever manned space flight from New Mexico',
          happenedAt: '2021-05-22',
          excerpt: 'VSS flew its sixth powered test flight reaching an altitude of 89km. This sub-orbital flight marked the first ever manned space flight from New Mexico which was piloted by CJ Sturkow (pilot-in-command) and Dave MacKay.',
          companyId,
        },
        {
          title: 'Virgin Galactic makes history with its space tourism flight',
          happenedAt: '2021-07-11',
          excerpt: 'Virgin Galactic took its founder Sir Richard Branson to the edge of space on Sunday July 11, in its first fully crewed flight. Sir Richard described the flight as the “experience of a lifetime”.',
          companyId,
        },
      ];

      milestonesArray = [...milestonesArray, ...companyMilestonesArray];
    }

    return queryInterface.bulkInsert(
      'milestones',
      milestonesArray.map((milestone) => ({ ...milestone, ...commonData })),
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('milestones', null, {});
  },
};
