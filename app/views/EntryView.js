var EntryView = Backbone.Marionette.View.extend({
  tagName: 'tr',
  template: require("../templates/entry-template.html"),
});

module.exports = EntryView;