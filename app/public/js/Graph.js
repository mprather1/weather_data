var Backbone = require("backbone");
var Marionette = require('marionette');
var d3 = require("d3")

function line(){
  var $el = {}
  var width = 960
  var height = 500
  var color = 'steelblue'
  var margin = {top: 10, right: 30, bottom: 30, left: 30}
  var data = []
  var svg, xAxis, yAxis
  var object = {};
  
  object.render = function(){
    if(!svg){

      var parseTime = d3.timeParse("%Y-%m-%d"); 
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);
      
      xAxis = d3.axisBottom(x)
      
      yAxis = d3.axisLeft(y)
      
      function make_x_gridlines(){
        return d3.axisBottom(x)
          .ticks(12);
      }
      function make_y_gridlines(){
        return d3.axisLeft(y)
          .ticks(12);
      }
      
      data.forEach(function(d){
        d.date = parseTime(d.dates);
        d.temperature_hi = +d.temperature_hi;
        d.temperature_low = +d.temperature_low;
      });
      
      var TempHiline = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.temperature_hi)})
        
      var TempLowline = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.temperature_low)})

      svg = $el.append('div')
        .classed('svg-container', true)
        .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom)) 
        .classed("svg-content-responsive", true)
        // .attr('width', width + margin.left + margin.right)
        // .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + "," + margin.top + ')');
      
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([d3.min(data, function(d) { return d.temperature_low }), d3.max(data, function(d) { return d.temperature_hi })]);
      
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        
      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        
      svg.append('path')
        .datum(data)
        .attr('class', 'line line-red')
        .attr('d', TempHiline)

      svg.append('path')
        .datum(data)
        .attr('class', 'line line-blue')
        .attr('d', TempLowline)

      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + height + ')')
        .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
        );
          
      svg.append('g')
        .attr('class', 'grid')
        .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
        );
    } 
    return object;
  }
  object.data = function(value){
    if (!arguments.length) return data;
    data = value;
    return object;
  };

  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    return object;
  };

  object.color = function(value){
    if (!arguments.length) return color;
    color = value;
    return object;
  };
  object.x = function(value){
    if (!arguments.length) return x;
    x = value;
    return object;
  }
  return object;
}

module.exports = line;