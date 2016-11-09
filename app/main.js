var Backbone = require("backbone");
var Marionette = require('marionette');

var Entries = require("./collections/Entries");
var TableView = require("./views/TableView");
var EntriesView = require("./views/EntriesView")
var GraphView = require("./views/GraphView")
var entries = new Entries();

var graphView = new GraphView({
  collection: entries
});
// graphView.render()

entries.fetch({
  success: function(){
    graphView.render()
  }
});