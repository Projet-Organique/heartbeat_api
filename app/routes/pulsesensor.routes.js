module.exports = app => {
  const pulsesensors = require("../controllers/pulsesensor.controller.js");

  var router = require("express").Router();

  // Reset all pulse to 0
  router.post("/reset/", pulsesensors.resetAll);

  // Reset one pulse to 0
  router.put("/reset/:id", pulsesensors.reset);

  // Create a new User
  router.post("/", pulsesensors.create);

  // Retrieve all pulsesensors
  router.get("/", pulsesensors.findAll);

  // Retrieve a single User with id
  router.get("/:id", pulsesensors.findOne);

  // Update a User with id
  router.put("/:id", pulsesensors.update);

  // Delete a User with id
  router.delete("/:id", pulsesensors.delete);

  // Create a new User
  router.delete("/", pulsesensors.deleteAll);

  app.use('/api/pulseSensors', router);
};