const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class milestone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.company);
    }
  }
  milestone.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    happenedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    companyId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'milestone',
  });
  return milestone;
};
