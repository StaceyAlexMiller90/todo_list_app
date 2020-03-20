const { user, todoItem, todoList, tag } = require("./models");

async function getUsers() {
  const allUsers = await user.findAll(
    {
    include: [{ model: todoList, attributes: ["name"] }],
  });
  return allUsers.map(user => user.get({ plain: true }));
}

// getUsers().then(users => console.log(users));

// Get one user by id with his lists.

async function getUserByPk(id) {
  const myuser = await user.findByPk(id,
    {
    include: [{ model: todoList, attributes: ["name"] }],
  });
  return myuser.get({ plain: true });
}
// getUserByPk().then(user => console.log(user));

//Get important TodoItems with the name of the list they belong to.

async function getItems() {
  const myItems = await todoItem.findAll(
    {
      where: {important: true}
    },
    {
    include: [{ model: todoList, attributes: ["name"] }],
  });
  return myItems.map(item => item.get({ plain: true }));
}
// getItems().then(items => console.log(items));

//Get one user by id with his lists, which also contain their belonging TodoItem's task attribute.

async function getUserByPk(id) {
  const myuser = await user.findByPk(id,
    {
    include: [{ model: todoList, attributes: ["name"], include: { model: todoItem, attributes: ["task"] }}],
  });
  return myuser.get({ plain: true });
}
// getUserByPk(2).then(user => console.log(user));

//add a query that finds all todoItems with their corresponding tags.

async function getItemsAndTags() {
  const items = await todoItem.findAll({include: [ {model:tag, attributes: ["title"]} ]});
  return items.map(item => item.get({ plain: true }))
}

// getItemsAndTags().then(items => console.log(items))
