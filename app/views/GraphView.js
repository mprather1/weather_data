var d3 = require("d3");
var line = require("../public/js/Graph");

var GraphView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'col-sm-7',
  id: 'graph',
  template: false,
  
  onRender: function(){
    this.collection.fetch({
      success: function(data){
        var line1 = line()
          .$el(d3.select("#graph"))
          .height(300)
          .width(960)
          .data(data.toJSON())
          .render();
      }
    });
  }
});

module.exports= GraphView;