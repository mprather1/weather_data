var Entry = require("../models/Entry");

var Entries = Backbone.Collection.extend({
  url: 'http://198.211.99.230:8000/api/entries',
  model: Entry
});

module.exports = Entries;