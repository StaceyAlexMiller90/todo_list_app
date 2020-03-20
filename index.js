const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const User = require("./models").user;
const TodoList = require("./models").todoList;
const corsMiddleWare = require("cors");

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));

app.use(corsMiddleWare(),express.json());

app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId", async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId)
      const user = await User.findByPk(id);
      user ? res.json(user) : res.status(404).send("User not found")
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});


app.get("/todoList", async (req, res, next) => {
  try {
      const todoList = await TodoList.findAll();
      res.json(todoList)
  } catch (e) {
    next(e);
  }
});

app.put("/todoList/:listId", async (req, res, next) => {
  try {
    const list = parseInt(req.params.listId);
    const listToUpdate = await TodoList.findByPk(list);
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

app.post("/todoList", async (req, res, next) => {
  try {
    const userId = parseInt(req.body.userId);
    const userisValid = await User.findByPk(userId)
    if (!userId || userId === " " || !userisValid) {
      res.status(400).send("Must provide a valid user ID");
    } else {
      const list = await TodoList.create(req.body);
      res.json(list);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const listId = parseInt(req.params.listId)

    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (!user && !listId) {
      res.status(404).send("Provide valid user & list")
    } else if (!user) {
      res.status(404).send("Provide valid user")
    } else if (!listId) {
      res.status(404).send("Provide valid list")
    } else {
      res.send(user.todoLists[listId]);
    }
  } catch (e) {
    next(e);
  }
});

app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userisValid = await User.findByPk(userId)
    if (!userisValid) {
      res.status(404).send("Must provide a valid user ID");
    } else {
      const { name } = req.body
      const list = await TodoList.create({userId, ...req.body});
      res.json(list);
    }
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const list = parseInt(req.params.listId)
    const listToUpdate = await TodoList.findByPk(list)
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e)
  }
})

app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const list = parseInt(req.params.listId)
    const listToDelete = await TodoList.findByPk(list)
    if(!listToDelete) {
      res.status(404).send("List not found")
    } else {
      const deletedList = await listToDelete.destroy()
      res.json(deletedList)
    }
  } catch (e) {
    next(e)
  }
})

app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if(!user) {
      res.status(404).send("User not found")
    } else {
      user.todoLists.forEach(async list => await list.destroy())
      res.status(204).send()
    }
  } catch (e) {
    next(e)
  }
})
