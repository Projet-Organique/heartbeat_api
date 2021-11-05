const db = require("../models");
const User = db.users;
const { Client, Server } = require('node-osc');
const client = new Client('192.168.1.17', 8082);
var server = new Server(8082, '0.0.0.0');


 exports.randomUser = async (req, res)  => {
console.log(req.body);
  const pulse = req.body.pulse;
  let pick = null;
  console.log(pulse);
  User.find({"pulse":0})
    .then(async data => {
      let picked = data[Math.floor(Math.random()*data.length)]
      if(picked == null){
        res.status(500).send({
          message: "No lantern found :("
        });
      }else{
        await User.findByIdAndUpdate(picked.id, req.body, { useFindAndModify: false })
        User.findById(picked.id)
        .then(data => {
          if (!data)
            res.status(404).send({ message: "Not found User with id " + id });
          else {
            res.send(data);
          }
        })
      }

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });

 
}

// Create and Save a new user
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({
    l_id: req.body.l_id,
    _id: req.body._id,
    pulse: req.body.pulse,
    universe: req.body.universe
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else {
        client.send('/data,', JSON.stringify(data), (err) => {
          if (err) console.error(err);
          //client.close();
        });
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} User were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {

};
