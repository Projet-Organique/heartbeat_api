module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/randomUser/", users.randomUser);
  // Create a new User
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

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