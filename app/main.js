var Backbone = require("backbone");
var Marionette = require('marionette');

var Entries = require("./collections/Entries");
var TableView = require("./views/TableView");
var EntriesView = require("./views/EntriesView")
var entries = new Entries();
entries.fetch()

// var entryView = new EntriesView({
//     collection: entries
// })

var tableView = new TableView({
  collection: entries
});

var myApp = new Marionette.Application({
    region: '#main'
});
myApp.start();
myApp.showView(tableView)