var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var EntrySchema = new Schema({
  temperature: Number,
  dew_point: Number,
  humidity: Number,
  date: Date
});

module.exports = mongoose.model("Entry", EntrySchema);