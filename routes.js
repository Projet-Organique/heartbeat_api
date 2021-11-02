let router = require('express').Router();// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});// Import contact controller
var heartRateController = require('./heartRateController');// Contact routes
router.route('/heartRates')
    .get(heartRateController.index)
    .post(heartRateController.new);router.route('/heartRates/:name')
    .get(heartRateController.view)
    .patch(heartRateController.update)
    .put(heartRateController.update)
    .delete(heartRateController.delete);// Export API routes
module.exports = router;