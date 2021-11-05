const db = require("../models");
const User = db.users;
const { Client } = require('node-osc');
const client = new Client('192.168.1.17', 8082);

exports.playground = async (req, res) => {
  try {
    const user = new User({
      l_id: req.body.l_id,
      _id: req.body._id,
      pulse: req.body.pulse,
      universe: req.body.universe
    });
    await user.save(user);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error
    });
  }
}

// RESET PULSE TO 0
exports.resetPulse = async (req, res) => {
  try {
    const options = { upsert: true };
    const updateDoc = {
      $set: { pulse: 0 },
    };
    const allUser = await User.find();
    allUser.forEach(async element => {
      await User.updateOne({ _id: element._id }, updateDoc, options);
    });
    res.send("All pulse are now set to 0");
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error
    });
  }
}

//SEND A RANDOMUSER WITH PULSE 0 WITH A RECEIVED PULSE VALUE 
exports.randomUser = async (req, res) => {
  console.log(req);
  try {
    const filter = { pulse: 0 };
    const allAvailableUser = await User.find(filter);
    if (allAvailableUser.length <= 0) {
      throw 'No lantern available!';
    }
    console.log('allAvailableUser: ', allAvailableUser);
    let picked = allAvailableUser[Math.floor(Math.random() * allAvailableUser.length)]
    const options = { upsert: true };
    const updateDoc = {
      $set: { pulse: req.body.pulse },
    };
    const result = await User.updateOne({ _id: picked._id }, updateDoc, options);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
    //  await client.close();
    const return_result = await User.find({ _id: picked._id });
    res.send(return_result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error
    });
  }
}

// Create and Save a new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  try {
    const user = new User({
      l_id: req.body.l_id,
      _id: req.body._id,
      pulse: req.body.pulse,
      universe: req.body.universe
    });
    await user.save(user);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  try {
    const data = await User.find(condition);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    client.send('/base_data,', JSON.stringify(user), (err) =>{
      if(err) console.log(err);
    })
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  console.log('req', req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  try {
    await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    const user = await User.findById(id);
    console.log(user);
    client.send('/base_data,', JSON.stringify(user), (err) =>{
      if(err) console.log(err);
    })
      res.send(`User ${id} updated successful!`);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndRemove(id)
      res.send(`User ${id} deleted successful!`);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error
    });
  }
};

// Delete all Users from the database.
exports.deleteAll = async (req, res) => {
  try {
    await User.deleteMany({})
      res.send(`Database deleted successful!`);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error
    });
  }
};