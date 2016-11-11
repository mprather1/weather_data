var d3 = require("d3");
var line = require("../public/js/Graph");

var GraphView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'col-sm-7',
  id: 'graph',
  template: false,
  
  onRender: function(){
    this.collection.fetch({
      success: function(col){
        var line1 = line()
          .$el(d3.select("#graph"))
          .x('hello')
          .height(200)
          .width(700)
          .data(col.toJSON())
          .render();
      }
    });
  }
});

module.exports= GraphView;