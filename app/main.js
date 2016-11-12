var Backbone = require("backbone");
var Marionette = require('marionette');
var d3 = require("d3");

var Entries = require("./collections/Entries");
var PageView = require("./views/PageView");
var entries = new Entries();
var style = require("./public/css/style.scss");
var chartStyle = require("./public/css/chart.scss");

_.extend(Backbone.Validation.callbacks, {
  valid: function (view, attr, selector) {
    var $el = view.$('[name=' + attr + ']'), 
        $group = $el.closest('.form-group');
    $group.removeClass('has-error');
    $group.find('.help-block').html('').addClass('hidden');
  },
  invalid: function (view, attr, error, selector) {
    var $el = view.$('[name=' + attr + ']'), 
      $group = $el.closest('.form-group');
    $group.addClass('has-error');
    $group.find('.help-block').html(error).removeClass('hidden');
  }
});

var pageView = new PageView({
  collection: entries
});

var myApp = new Marionette.Application({
  region: '#main',
});

myApp.start();
myApp.showView(pageView);
