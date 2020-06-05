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
          email: 'maxsimpson95@gmail.com',
          password: 'password',
          facebook: '10157419330571375',
          firstName: 'Max',
          lastName: 'Simpson'
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
          color: 'purple',
          userId: userID,
      },
      {
          name: 'family',
          color: 'blue',
          userId: userID,
      },
      {
        name: 'sleep',
        color: 'red',
        userId: userID,
      },
    ], {})

    console.log('finished bulk insert of Categories');

    const output = await queryInterface.sequelize.query(
      `SELECT id from Categories;`
    )

    const categories = output[0].map(textRow => textRow.id)

    await queryInterface.sequelize.query(
      `delete from Timeblocks;`
    );

    const dateFormat = "YYYY-MM-DD"
    const timeFormat = "YYYY-MM-DD HH:mm:ss"

    return await queryInterface.bulkInsert('Timeblocks', [
      {
        date: moment().format(dateFormat),
        startTime: moment('10:00 AM', 'h:mm A').format(timeFormat),
        endTime: moment().format(timeFormat),
        duration: moment().diff(moment('10:00 AM', 'h:mm A'),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[0],
      },
      {
        date: moment().format(dateFormat),
        startTime: moment('8:00 AM', 'h:mm A').format(timeFormat),
        endTime: moment('10:00 AM', 'h:mm A').format(timeFormat),
        duration: moment('10:00 AM', 'h:mm A').diff(moment('8:00 AM', 'h:mm A'),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[1],
      },
      {
        date: moment().subtract(7, "days").format(dateFormat),
        startTime: moment('10:00 PM', 'h:mm A').subtract(7, "days").format(timeFormat),
        endTime: moment('6:00 AM', 'h:mm A').subtract(6, "days").format(timeFormat),
        duration: moment('6:00 AM', 'h:mm A').subtract(6, "days").diff(moment('10:00 PM', 'h:mm A').subtract(7, "days"),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[2],
      },
      {
        date: moment().subtract(6, "days").format(dateFormat),
        startTime: moment('9:38 PM', 'h:mm A').subtract(6, "days").format(timeFormat),
        endTime: moment('5:43 AM', 'h:mm A').subtract(5, "days").format(timeFormat),
        duration: moment('5:43 AM', 'h:mm A').subtract(5, "days").diff(moment('9:38 PM', 'h:mm A').subtract(6, "days"),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[2],
      },
      {
        date: moment().subtract(5, "days").format(dateFormat),
        startTime: moment('11:52 PM', 'h:mm A').subtract(5, "days").format(timeFormat),
        endTime: moment('7:02 AM', 'h:mm A').subtract(4, "days").format(timeFormat),
        duration: moment('7:02 AM', 'h:mm A').subtract(4, "days").diff(moment('11:52 PM', 'h:mm A').subtract(5, "days"),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[2],
      },
      {
        date: moment().subtract(4, "days").format(dateFormat),
        startTime: moment('2:00 AM', 'h:mm A').subtract(3, "days").format(timeFormat),
        endTime: moment('8:11 AM', 'h:mm A').subtract(3, "days").format(timeFormat),
        duration: moment('8:11 AM', 'h:mm A').subtract(3, "days").diff(moment('2:00 AM', 'h:mm A').subtract(3, "days"),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[2],
      },
      {
        date: moment().subtract(3, "days").format(dateFormat),
        startTime: moment('10:04 PM', 'h:mm A').subtract(3, "days").format(timeFormat),
        endTime: moment('6:16 AM', 'h:mm A').subtract(2, "days").format(timeFormat),
        duration: moment('6:16 AM', 'h:mm A').subtract(2, "days").diff(moment('10:04 PM', 'h:mm A').subtract(3, "days"),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[2],
      },
      {
        date: moment().subtract(2, "days").format(dateFormat),
        startTime: moment('8:54 PM', 'h:mm A').subtract(2, "days").format(timeFormat),
        endTime: moment('6:12 AM', 'h:mm A').subtract(1, "days").format(timeFormat),
        duration: moment('6:12 AM', 'h:mm A').subtract(1, "days").diff(moment('8:54 PM', 'h:mm A').subtract(2, "days"),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[2],
      },
      {
        date: moment().subtract(1, "days").format(dateFormat),
        startTime: moment('9:24 PM', 'h:mm A').subtract(1, "days").format(timeFormat),
        endTime: moment('7:22 AM', 'h:mm A').format(timeFormat),
        duration: moment('7:22 AM', 'h:mm A').diff(moment('9:24 PM', 'h:mm A').subtract(1, "days"),'hours',true), //usually this would be calculated before insert but queryInterface doesnt support the hook
        UserId: userID,
        CategoryId: categories[2],
      },

      
    ], {})

  },

  down: async (queryInterface, Sequelize) => {

   await queryInterface.bulkDelete('timeblocks', null, {});
   await queryInterface.bulkDelete('categories', null, {});
   return await queryInterface.bulkDelete('users', null, {});
  }
};
