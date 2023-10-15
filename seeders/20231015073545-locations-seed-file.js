'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Locations', 
      ['臺北市', '新北市', '基隆市', '新竹市', '桃園市', '新竹縣', '宜蘭縣', '臺中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '高雄市', '臺南市', '嘉義市', '嘉義縣', '屏東縣', '澎湖縣', '花蓮縣', '臺東縣', '金門縣', '連江縣']
      .map(item => {
        return {
          name: item,
          created_at: new Date(),
          updated_at: new Date()
        }
      }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', {})
  }
};
