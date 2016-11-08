var Backbone = require("backbone");
var Marionette = require('marionette');
var d3 = require("d3")

var Entries = require("./collections/Entries");
var TableView = require("./views/TableView");
var EntriesView = require("./views/EntriesView")
var GraphView = require("./views/GraphView")
var entries = new Entries();

var GraphView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'container-fluid',
  template: _.template("hello"),
  onRender: function(){
    
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%d-%b-%y");
    
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    var valueline = d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.temperature_hi) });
    
    var svg = d3.select('body')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    
    var data = this.collection.toJSON(); 
    
    data.forEach(function(d){
      d.date = parseTime(d.dates);
      d.temperature_hi = +d.temperature_hi;
    });
    
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.temperature_hi })]);
    
    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', valueline);
      
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
    
    svg.append('g')
      .call(d3.axisLeft(y));
  }
});

var graphView = new GraphView({
  collection: entries
});
// graphView.render()

entries.fetch({
  success: function(){
    graphView.render()
  }
});