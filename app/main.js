var Backbone = require("backbone");
var Marionette = require('marionette');
var d3 = require("d3")

var Entries = require("./collections/Entries");
var PageView = require("./views/PageView")
var entries = new Entries();
var style = require("./public/css/style.scss")
var chartStyle = require("./public/css/chart.scss")

var pageView = new PageView({
  collection: entries
})

var myApp = new Marionette.Application({
  region: '#main',
})

myApp.start()
myApp.showView(pageView)
