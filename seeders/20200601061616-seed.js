const moment = require("moment")
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query(
      `delete from Users;`
    );

    await queryInterface.bulkInsert('Users', [
      {
          email: 'test@test.com',
          password: 'password',
          facebook: null,
          firstName: 'Steve',
          lastName: 'Jones'
      }
    ], {})

    console.log('finished bulk insert of Users');

    const users = await queryInterface.sequelize.query(
      `SELECT * from Users;`
    );

    let user = users[0] //this gets back the first row returned
    let userID = user[0].id //for some reason this is an array as well

    await queryInterface.sequelize.query(
      `delete from Categories;`
    );

    await queryInterface.bulkInsert('Categories', [
      {
          name: 'work',
          color: 'red',
          userId: userID,
      },
      {
          name: 'family',
          color: 'blue',
          userId: userID,
      },
    ], {})

    console.log('finished bulk insert of Categories');

    const categories = await queryInterface.sequelize.query(
      `SELECT id from Categories;`
    );

    let category1 = categories[0] //this gets back the first row returned
    let category1ID = category1[0].id //for some reason this is an array as well

    let category2 = categories[0] //this gets back the first row returned
    let category2ID = category2[0].id //for some reason this is an array as well

    console.log('about to start bulk insert of timeblocks');

    await queryInterface.sequelize.query(
      `delete from Timeblocks;`
    );

    return await queryInterface.bulkInsert('Timeblocks', [
      {
        date: moment().format("YYYY-MM-D"),
        startTime: moment().format('HH:mm:ss'),
        endTime: moment().subtract(30, "minutes").format('HH:mm:ss'),
        UserId: userID,
        CategoryId: category1ID,
      },
      {
        date: moment().format("YYYY-MM-D"),
        startTime: moment().subtract(2, "hours").format('HH:mm:ss'),
        endTime: moment().subtract(45, "minutes").format('HH:mm:ss'),
        UserId: userID,
        CategoryId: category2ID,
      }
    ], {})

  },

  down: async (queryInterface, Sequelize) => {

   await queryInterface.bulkDelete('timeblocks', null, {});
   await queryInterface.bulkDelete('categories', null, {});
   return await queryInterface.bulkDelete('users', null, {});
  }
};
