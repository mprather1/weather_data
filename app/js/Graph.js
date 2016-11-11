var Backbone = require("backbone");
var Marionette = require('marionette');
var d3 = require("d3")

var getData = function(){
  var data = [];
  for(var i=0; i<100; i++){
    data.push({
      x: i,
      y: Math.round(Math.random() * 100)
    });
  };
  return data;
};

function line(){
  var $el = d3.select('body')
  var width = 960
  var height = 500
  var color = 'steelblue'
  var margin = {top: 10, right: 30, bottom: 30, left: 30}
  var data = []
  var svg, xAxis, yAxis, line
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
          .ticks(10);
      }
      function make_y_gridlines(){
        return d3.axisLeft(y)
          .ticks(10);
      }
      
      data.forEach(function(d){
        d.date = parseTime(d.dates);
        d.temperature_hi = +d.temperature_hi;
      });
      
      line = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.temperature_hi)})
        
      svg = $el.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + "," + margin.top + ')');
      
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.temperature_hi })]);
      
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        
      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        
      svg.append('path')
        .datum(data)
        .attr('class', 'line-red')
        .attr('stroke', color)
        .attr('d', line);
        
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