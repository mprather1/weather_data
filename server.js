var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Entry = require("./db/models/Entry"),
    mongoose = require("mongoose");
    
mongoose.connect('mongodb://localhost/weather_data', function(err, res){
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log("Connect to database...");
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next){
  console.log("Loading....");
  next();
});

router.route('/entries')
  .get(function(req, res){
    Entry.find(function(err, response){
      if (err){
        res.send(err);
      } else {
        res.json(response);
      }
    });
  });
  
app.use('/api', router);

var server = app.listen(8000, function(){
  console.log("Listening on port 8000...");
});

module.exports = server;