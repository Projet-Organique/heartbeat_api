const db = require("../models");
const User = db.users;
var mqtt = require('mqtt')
const host = '127.0.0.1'
const port = '1883'
var client  = mqtt.connect(`mqtt://${host}:${port}`)
client.on('connect', function () {
  console.log(`'Connected to MQTT: mqtt://${host}:${port}`)
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

// RESET PULSE TO 0
exports.resetAll = async (req, res) => {
  try {
    const options = { upsert: true };
    const updateDoc = {
      $set: { pulse: 0 },
    };
    const allUser = await User.find();
    allUser.forEach(async element => {
      await User.update({ _id: element._id }, updateDoc, options);
    });
    
    res.send("All pulse are now set to 0");
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error
    });
  }
}



// RESET ONE PULSE TO 0
exports.reset = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndUpdate(id, {"pulse": "0"}, { useFindAndModify: false })
      res.send(`User ${id} pulse is now 0!`);
  } catch (error) {
    console.log('error', error);
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
      return res.status(400).send({
         message: 'No lantern available!'
      });
    }
    let picked = allAvailableUser[Math.floor(Math.random() * allAvailableUser.length)]
    // const options = { upsert: true };
    // const updateDoc = {
    //   $set: { pulse: req.body.pulse },
    // };
    //const result = await User.updateOne({ _id: picked._id }, updateDoc, options);
    //console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
    //  await client.close();
    //const return_result = await User.find({ _id: picked._id });
    res.send(picked);
  } catch (error) {
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
      hostName: req.body.hostName,
      macAddress: req.body.macAddress,
      ipAddress: req.body.ipAddress,
    });
    await user.save(user);
    console.log('user', user);
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
    console.log('user', user);
    client.publish('/api/user/newPulse', JSON.stringify(user))
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