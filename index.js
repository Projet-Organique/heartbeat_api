
let express = require('express')
let app = express();
var port = process.env.PORT || 8080;
app.get('/', (req, res) => res.send('Hello World with Express'));
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

// Add the code below to index.js// Import routes
let apiRoutes = require("./routes")
app.use('/api', apiRoutes)