"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Stacey Miller",
          email: "stacey@stacey.com",
          phone: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nick Silva",
          email: "nick@silva.com",
          phone: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
