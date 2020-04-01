"use strict";
require("dotenv").config();
const bcrypt = require("bcryptjs");
const hashedPassword = bcrypt.hashSync(
  process.env.TEST_USER_PASSWORD,
  bcrypt.genSaltSync(10)
);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("users", [
      {
        firstName: "Test",
        lastName: "Case",
        email: "test@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Test2",
        lastName: "Case",
        email: "test2@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("users", null, {});
  }
};
