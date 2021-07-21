const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class stats extends Model {
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
  stats.init({
    flightsQuantity: {
      type: DataTypes.INTEGER,
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    maxAltitude: {
      type: DataTypes.INTEGER,
    },
    hasEscapeSystem: {
      type: DataTypes.BOOLEAN,
    },
    crewedFlightOn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    requiresPilot: {
      type: DataTypes.BOOLEAN,
    },
    passengersQuantity: {
      type: DataTypes.INTEGER,
    },
    landingType: {
      type: DataTypes.STRING,
    },
    companyId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'stats',
  });
  return stats;
};
