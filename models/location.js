'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.hasMany(models.Hospital, { foreignKey: 'locationId' })
    }
  }
  Location.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'Locations',
    underscored: true,
  });
  return Location;
};