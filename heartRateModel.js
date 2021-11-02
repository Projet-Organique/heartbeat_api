
const mongoose = require('mongoose');// Setup schema
var heartrateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});// Export Contact model
var Heartrate = module.exports = mongoose.model('heartrate', heartrateSchema);module.exports.get = function (callback, limit) {
    Heartrate.find(callback).limit(limit);
}