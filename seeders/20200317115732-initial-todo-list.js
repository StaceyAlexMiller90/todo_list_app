"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "todolists",
      [
        {
          name: "first list",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "second list",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("todolists", null, {});
  },
};