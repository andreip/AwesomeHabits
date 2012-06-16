/* track progress */
$(function(){
  var TrackProgressView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#progress-template').html()),
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
	$('#progress-link').bind('click', function() {
  	var Track = new TrackProgressView;
  	console.log(Track)
  });  
});