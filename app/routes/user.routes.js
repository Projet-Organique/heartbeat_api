module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Reset all pulse to 0
  router.post("/reset/", users.resetAll);

  // Reset one pulse to 0
  router.put("/reset/:id", users.reset);

  // Return random user with pulse sended
  router.get("/randomUser/", users.randomUser);

  // Create a new User
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Create a new User
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};