var Backbone = require("backbone");
var Marionette = require('marionette');

var Entries = require("./collections/Entries");
var TableView = require("./views/TableView");
var EntriesView = require("./views/EntriesView")
var PageView = require("./views/PageView")
var GraphView = require("./views/GraphView")
var entries = new Entries();
entries.fetch()
// var graphView = new GraphView({
//   collection: entries
// });
// graphView.render()

// entries.fetch({
//   success: function(){
//     graphView.render()
//   }
// });

var pageView = new PageView({
  collection: entries
})
// $('body').html(pageView.render().el)
var myApp = new Marionette.Application({
  region: '#main',
})
myApp.start()
myApp.showView(pageView)