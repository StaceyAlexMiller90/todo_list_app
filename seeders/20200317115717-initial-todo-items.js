"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "todoitems",
      [
        {
          task: "Buy Groceries",
          deadline: "18.03.20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Clean House",
          deadline: "25.03.20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Do laundry",
          deadline: "01.04.20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("todoitems", null, {});
  },
};
