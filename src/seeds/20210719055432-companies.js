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
    const companiesArray = [
      {
        name: 'Blue Origin',
        founder: 'Jeff Bezos',
        description: 'Blue Origin was founded by Jeff Bezos with the vision of enabling a future where millions of people are living and working in space to benefit Earth. In order to preserve Earth, Blue Origin believes that humanity will need to expand, explore, find new energy and material resources, and move industries that stress Earth into space. Blue is working on this today by developing partially and fully reusable launch vehicles that are safe, low cost and serve the needs of all civil, commercial and defense customers.',
        foundedAt: '2000-09-08',
        imageUrl: 'https://res.cloudinary.com/sivicencio-uc/image/upload/v1626677767/blue_origin_hltp9a.jpg',
      },
      {
        name: 'Virgin Galactic',
        founder: 'Richard Branson',
        description: 'We are at the vanguard of a new industry, pioneering the next generation of reusable space vehicles. We aim to transform the current cost, safety and environmental impact of space-launch. In doing so we are helping to create, for the first time, a basic space access infrastructure that will act as an enabler for scientists and entrepreneurs. It will also provide the catalyst for a new age of space exploration which promises enormous positive potential for life on Earth.',
        foundedAt: '2004-09-27',
        imageUrl: 'https://res.cloudinary.com/sivicencio-uc/image/upload/v1626677860/virgin_galactic_i5fmpk.jpg',
      },
    ];

    const commonData = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert(
      'companies',
      companiesArray.map((company) => ({ ...company, ...commonData })),
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('companies', null, {});
  },
};
