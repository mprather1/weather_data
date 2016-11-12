var Entry = require("../models/Entry");

var FormView = Backbone.Marionette.View.extend({
  template: require('../templates/form-template.html'),
  className: 'container-fluid panel-body',
  initialize: function(){
    this.model = new Entry();
    Backbone.Validation.bind(this, {
      model: this.model
    });
  },
  ui: {
    submit: '.submit-button',
    cancel: '.cancel-button'
  },
  events: {
    'click @ui.cancel': 'cancelForm',
    'click @ui.submit': 'submitForm'
  },
  submitForm: function(e){
    e.preventDefault();
    var entryAttrs = {
      temperature_hi: $('#temperature_hi_input').val(),
      temperature_low: $('#temperature_low_input').val(),
      dew_point: $('#dew_point_input').val(),
      humidity: $('#humidity_input').val(),
      dates: $('#dates_input').val()
    };
    this.model.set(entryAttrs);
    if(this.model.isValid(true)){
      this.model.save();
      this.collection.add(this.model);
      Backbone.Validation.unbind(this);
      Backbone.trigger('form:cancel');
    }
    return false;
  },
  cancelForm: function(e){
    e.preventDefault();
    Backbone.trigger('form:cancel');
  }
});

module.exports = FormView;