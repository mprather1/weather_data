var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var EntrySchema = new Schema({
  temperatureLow: Number,
  temperatureHi: Number,
  dew_point: Number,
  humidity: Number,
  dates: String
});

module.exports = mongoose.model("Entry", EntrySchema);