const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    founder: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    foundedAt: {
      type: DataTypes.DATEONLY,
    },
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};
