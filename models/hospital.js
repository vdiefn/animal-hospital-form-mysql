'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hospital.belongsTo(models.Location, { foreignKey: 'categoryId' })
    }
  }
  Hospital.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    openingHours: DataTypes.STRING,
    closingHours: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hospital',
    tableName: 'Hospitals',
    underscored: true,
  });
  return Hospital;
};