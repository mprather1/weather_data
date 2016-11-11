var d3 = require("d3")
var line = require("../js/Graph")

var GraphView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'col-sm-7',
  id: 'graph',
  template: false,
  initialize: function(){
    // this.listenTo(Backbone, 'form:cancel', this.render)
  },
  
  onRender: function(){
    this.collection.fetch({
      success: function(col){
        var line1 = line()
          .$el(d3.select("#graph"))
          .height(200)
          .width(700)
          .data(col.toJSON())
          .render();
      }
    });
  }
});

module.exports= GraphView;