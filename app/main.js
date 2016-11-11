var Backbone = require("backbone");
var Marionette = require('marionette');
var line = require("./js/Graph")
var d3 = require("d3")

var Entries = require("./collections/Entries");
var PageView = require("./views/PageView")
var entries = new Entries();
var css = require("./public/style.scss")

var pageView = new PageView({
  collection: entries
})

var myApp = new Marionette.Application({
  region: '#main',
})

myApp.start()
myApp.showView(pageView)
// var Data = Backbone.Model.extend({
  
// })

// var Datas = Backbone.Collection.extend({
//   model: Data
// })

// var data1 = new Data({x: 1, y: 2})
// var data2 = new Data({x: 2, y: 3})
// var data3 = new Data({x: 3, y: 2.5})
// var data4 = new Data({x: 4, y: 4})
// var data5 = new Data({x: 5, y: 1.2})
// var datas = new Datas([data1, data2, data3, data4, data5]);

// var line1 = line()
//               .$el(d3.select("#main"))
//               .height(200) // Set height
//               .data(datas.toJSON()) // Set data
//               .render();