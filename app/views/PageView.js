var GraphView = require("./GraphView")
var EntriesView = require("./EntriesView");

var PageView = Backbone.Marionette.View.extend({
  tagName: 'div',
  // className: 'container-fluid',
  template: require("../templates/page-template.html"),
  regions: {
    graph: {
      el: '#graph-view'
    },
    main: {
      el: '#main-view'
    }
  },
  onRender: function(){
    this.showChildView('graph', new GraphView({
      collection: this.collection
    }));
    this.showChildView('main', new EntriesView({
      collection: this.collection
    }));
  }
});

module.exports = PageView;