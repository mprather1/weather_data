var Backbone = require("backbone");
var Marionette = require('marionette');
var Entries = require("./models/Entry");

var entries = new Entries();

entries.fetch()

console.log(entries)
