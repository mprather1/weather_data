var Entry = require("../models/Entry");

var Entries = Backbone.Collection.extend({
  url: 'http://shintech.ninja:8000/api/entries',
  model: Entry
});

module.exports = Entries;