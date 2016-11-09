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

parseTime = d3.timeParse("%Y-%m-%d");    
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    var tempHiLine = d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.temperature_hi) })
       .curve(d3.curveCatmullRom.alpha(0.5));
       
    var tempLowLine = d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.temperature_low) })
      .curve(d3.curveCatmullRom.alpha(0.5));
      
    var svg = d3.select('body')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    
    var data = this.collection.toJSON(); 
    
    function make_x_gridlines(){
      return d3.axisBottom(x)
        .ticks(10)
    }
    function make_y_gridlines(){
      return d3.axisLeft(y)
        .ticks(10)
    }
    
    data.forEach(function(d){
      d.date = parseTime(d.dates);
      d.temperature_hi = +d.temperature_hi;
    });
    
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.temperature_hi })]);
    
    svg.append('path')
      .data([data])
      .attr('class', 'line-red')
      .attr('d', tempHiLine);
    
    svg.append('path')
      .data([data])
      .attr('class', 'line-blue')
      .attr('d', tempLowLine);
      
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
    
    svg.append('g')
      .call(d3.axisLeft(y));
      
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
      )
      
    svg.append('g')
      .attr('class', 'grid')
      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
      )
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