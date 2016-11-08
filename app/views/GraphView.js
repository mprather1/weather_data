var d3 = require("d3")

var GraphView = Backbone.Marionette.View.extend({
  template: _.template("hello"),
  onRender: function(){
    var data = this.collection.toJSON()
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0])

var valueline = d3.line()
  .x(function(d) { return x(d.dates) })
  .y(function(d) { return y(d.temperature_hi) })

var svg = d3.select('body')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    
// var data = [
//   {dates:"1-May-12",temperature_hi:"58.13"},
//   {dates:"30-Apr-13",temperature_hi:"53.98"},
//   {dates:"27-Apr-14",temperature_hi:"67.00"},
//   {dates:"26-Apr-15",temperature_hi:"89.70"},
//   {dates:"25-Apr-16",temperature_hi:"100.00"}
// ];

data.forEach(function(d){
  d.dates = parseTime(d.dates);
  d.temperature_hi = +d.temperature_hi
});

x.domain(d3.extent(data, function(d) { return d.dates; }))
y.domain([0, d3.max(data, function(d) { return d.temperature_hi })])

svg.append('path')
  .data([data])
  .attr('class', 'line')
  .attr('d', valueline)
  
svg.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x));

svg.append('g')
  .call(d3.axisLeft(y));
  }
});

module.exports = GraphView;