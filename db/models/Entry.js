var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var EntrySchema = new Schema({
  temperature_low: Number,
  temperature_hi: Number,
  dew_point: Number,
  humidity: Number,
  date: Date
});

module.exports = mongoose.model("Entry", EntrySchema);