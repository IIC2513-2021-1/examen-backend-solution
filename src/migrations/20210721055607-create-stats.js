module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flightsQuantity: {
        type: Sequelize.INTEGER,
      },
      vehicleType: {
        type: Sequelize.STRING,
      },
      maxAltitude: {
        type: Sequelize.INTEGER,
      },
      hasEscapeSystem: {
        type: Sequelize.BOOLEAN,
      },
      crewedFlightOn: {
        type: Sequelize.DATEONLY,
      },
      requiresPilot: {
        type: Sequelize.BOOLEAN,
      },
      passengersQuantity: {
        type: Sequelize.INTEGER,
      },
      landingType: {
        type: Sequelize.STRING,
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'companies',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('stats');
  },
};
