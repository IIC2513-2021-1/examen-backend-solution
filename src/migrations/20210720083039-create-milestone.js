module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('milestones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      happenedAt: {
        type: Sequelize.DATEONLY,
      },
      excerpt: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('milestones');
  },
};
