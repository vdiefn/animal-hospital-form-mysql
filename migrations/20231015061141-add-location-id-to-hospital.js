'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Hospitals', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'Locations',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Hospital', 'location_id')
  }
};
