
const express = require('express')
let app = express();

// Import Body parser
let bodyParser = require('body-parser');// Import Mongoose
let mongoose = require('mongoose');// Configure bodyparser to handle post requests

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});var db = mongoose.connection;


var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World with Express'));
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

// Add the code below to index.js// Import routes
let apiRoutes = require("./routes")
app.use('/api', apiRoutes)