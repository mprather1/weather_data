var validation = require("backbone.validation");

var Entry = Backbone.Model.extend({
  urlRoot: 'http://shintech.ninja:8000/api/entries',
  validation: {
    temperature_hi: {
      required: true,
      pattern: 'number',
      minLength: 1,
      maxLength: 3,
    },
    temperature_low: {
      required: true,
      pattern: 'number',
      minLength: 1,
      maxLength: 3,
    },
    humidity: {
      required: true,
      pattern: 'number',
      minLength: 1,
      maxLength: 2,
    },
    dew_point: {
      required: true,
      pattern: 'number',
      minLength: 1,
      maxLength: 3,
    },
    dates: {
      required: true,
      // pattern: 'date'
    }
  }
});

module.exports = Entry;