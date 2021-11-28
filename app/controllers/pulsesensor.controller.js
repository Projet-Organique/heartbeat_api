const db = require("../models");
const Pulsesensor = db.pulseSensors;
const User = db.users;
const client = db.mqtt;

//client.publish('api/pulsesensors/state', "22")


// RESET PULSE TO 0
exports.resetAll = async (req, res) => {
    try {
        const options = {
            upsert: true
        };
        const updateDoc = {
            $set: {
                state: 'idle'
            },
        };
        const allUser = await User.find();
        allUser.forEach(async element => {
            await User.update({
                _id: element._id
            }, updateDoc, options);
        });
        res.send("All Pulse Sensors are now set to idle");
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
        await User.findByIdAndUpdate(id, {
            "state": "idle"
        }, {
            useFindAndModify: false
        })
        res.send(`Pulse Sensor ${id} stae is now idle!`);
    } catch (error) {
        console.log('error', error);
        res.status(500).send({
            message: error
        });
    }
}

// Create and Save a new user
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    try {
        const pulsesensor = new Pulsesensor({
            _id: req.body._id,
            universe: req.body.universe,
            state: req.body.state,
        });
        await pulsesensor.save(pulsesensor);;
        res.send(pulsesensor);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error
        });
    }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    console.log(req);
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    try {
      const data = await Pulsesensor.find(condition);
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
        const pulsesensor = await Pulsesensor.findById(id);
        res.send(pulsesensor);
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }
};


// Update a User by the id in the request
exports.update = async (req, res) => {


    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    try {
        await Pulsesensor.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        const puslesensor = await Pulsesensor.findById(id);
        
       // client.publish('/api/pulsesensors/state', JSON.stringify(puslesensor))
       client.publish('api/pulsesensors/'+id+'/state', JSON.stringify(puslesensor))
        res.send(`PulseSensor ${id} updated successful!`);
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
        await Pulsesensor.findByIdAndRemove(id)
        res.send(`Pulsesensor ${id} deleted successful!`);
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