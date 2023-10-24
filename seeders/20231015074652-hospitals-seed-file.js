'use strict';
const faker = require('faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const locations = await queryInterface.sequelize.query(
      'SELECT id FROM Locations;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Hospitals',
      Array.from({ length: 10 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        opening_hours: '08:00',
        closing_hours: '18:00',
        image: `https://loremflickr.com/320/240/hospital/?lock=${Math.random() * 100}`,
        description: faker.lorem.text(),
        created_at: new Date(),
        updated_at: new Date(),
        location_id: locations[Math.floor(Math.random() * locations.length)].id
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hospitals', {})
  }
};
