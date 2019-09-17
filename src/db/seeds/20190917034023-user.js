'use strict';

const faker = require("faker");

 let users = [
   {
    username: "blue",
    email: "blue@test.com",
    password: "abc1234",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
   },
   {
    username: "red",
    email: "red@test.com",
    password: "abc4567",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
   },
   {
    username: "green",
    email: "green@test.com",
    password: "abc78910",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
   }
 ];


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Users",null, {});
  }
};
