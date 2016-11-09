var Backbone = require("backbone");
var Marionette = require('marionette');

var Entries = require("./collections/Entries");
var PageView = require("./views/PageView")
var entries = new Entries();

var pageView = new PageView({
  collection: entries
})

var myApp = new Marionette.Application({
  region: '#main',
})

myApp.start()
myApp.showView(pageView)