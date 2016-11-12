var EntriesView = require("./EntriesView");
var FormView = require("./FormView");

var TableView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'panel panel-default',
  template: require("../templates/table-template.html"),
  events: {
    'click button': 'showForm',
    'mouseover .table-header': 'mouseoverFunc',
    'mouseout .table-header': 'mouseoutFunc'
  },
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    },
    main: {
      el: '.panel-body',
      replaceElement: true
    }
  },
  initialize: function(){
    this.listenTo(Backbone, 'form:cancel', this.render);
  },
  onRender: function(){
    this.showChildView('body', new EntriesView({
      collection: this.collection
    }));
  },
  showForm: function(){
    this.showChildView('main', new FormView({
      collection: this.collection
    }));
  },
  mouseoverFunc: function(event){
    $(event.currentTarget).css({"background-color":"lightgrey","cursor":"pointer"});
  },
  mouseoutFunc: function(event){
    $(event.currentTarget).css("background-color", "rgb(231, 231, 230)");
  },
});

module.exports = TableView;
