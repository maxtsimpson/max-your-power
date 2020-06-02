const moment = require("moment")
const db = require("../models")
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
      `SELECT id from Users;`
    );

    const user = users[0] //this gets back the first row returned
    const userID = user[0].id //for some reason this is an array as well

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

    const category1 = categories[0] //this gets back the first row returned
    const category1ID = category1[0].id //for some reason this is an array as well

    const category2 = categories[0] //this gets back the first row returned
    const category2ID = category2[0].id //for some reason this is an array as well

    console.log('about to start bulk insert of timeblocks');

    await queryInterface.sequelize.query(
      `delete from Timeblocks;`
    );

    const dateFormat = "YYYY-MM-DD"
    const timeFormat = "YYYY-MM-DD HH:mm:ss"

    return await queryInterface.bulkInsert('Timeblocks', [
      {
        date: moment().format(dateFormat),
        startTime: moment().format(timeFormat),
        endTime: moment().subtract(30, "minutes").format(timeFormat),
        UserId: userID,
        CategoryId: category1ID,
      },
      {
        date: moment().format(dateFormat),
        startTime: moment().subtract(2, "hours").format(timeFormat),
        endTime: moment().subtract(45, "minutes").format(timeFormat),
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
