// contactController.js// Import contact model
HeartRate = require('./heartRateModel');// Handle index actions
exports.index = function (req, res) {
    HeartRate.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};


exports.new = function (req, res) {
    var heartRateData = new HeartRate();
    heartRateData.name = req.body.name;
    heartRateData.save(function (err) {
         if (err)
            res.json(err);
            res.json({
            message: 'New contact created!',
            data: heartRateData,
        });
    });
};


exports.view = function (req, res) {
    HeartRate.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};// Handle update contact info
exports.update = function (req, res) {HeartRate.findById(req.params.name, function (err, contact) {
        if (err)
        res.send(err);contact.name = req.body.name ? req.body.name : contact.name;
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};


exports.delete = function (req, res) {
    HeartRate.remove({
        _id: req.params.name
    }, function (err, contact) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};