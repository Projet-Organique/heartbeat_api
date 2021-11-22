const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.pulseSensors = require("./pulsesensor.model.js")(mongoose);
db.mqtt = require("./mqtt.model.js")();

module.exports = db;