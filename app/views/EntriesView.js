var EntryView = require("./EntryView");

var EntriesView = Backbone.Marionette.CollectionView.extend({
  tagName: 'tbody',
  childView: EntryView
});

module.exports = EntriesView;