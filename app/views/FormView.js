var Entry = require("../models/Entry");

var FormView = Backbone.Marionette.View.extend({
  template: require('../templates/form-template.html'),
  className: 'container-fluid panel-body',
  initialize: function(){
    this.model = new Entry();
    this.listenTo(Backbone, 'form:submit', this.submitForm);
  },
  events: {
    'click .cancel-button': 'cancelForm',
    'click .submit-button': 'submitForm'
  },
  submitForm: function(){
    var entryAttrs = {
      temperature_hi: $('#temperature_hi_input').val(),
      temperature_low: $('#temperature_low_input').val(),
      dew_point: $('#dew_point_input').val(),
      humidity: $('#humidity_input').val(),
      dates: $('#dates_input').val()
    }
    console.log(entryAttrs)
    this.model.set(entryAttrs);
    this.model.save();
    this.collection.add(this.model);
    Backbone.trigger('form:cancel')
  },
  cancelForm: function(){
    Backbone.trigger('form:cancel')
  }
});

module.exports = FormView;