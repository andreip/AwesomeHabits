/* track progress */
$(function(){

	var TrackModel = Backbone.Model.extend({
			initialize: function() {
			if (!this.get("name")){
				this.set({"name":"habbit 1"}); 
				this.set({"progress":32});
				}
			}
	});



  var TrackProgressView = Backbone.View.extend({
    tagName:  "li",
    className: "hero-entry",
    template: _.template($('#progress-template').html()),
    events: {},
    initialize: function() {
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
	$('#progress-link').bind('click', function() {
    $('#eachday').hide();
    $('#welcomescreen').hide();
    
		$('#trackprogress').remove();
		$('div.hero-unit').append('<div id="trackprogress"></div> <!-- track progress -->')
		var allData = window.dailyHabits
		var habbits = window.habits    
		for (var i = 0;i<habbits.length;i++){
      var progressData = _.map(allData, 
        function(dataForADay){return dataForADay[i];
        });
      var progressSum = _.reduce(progressData, 
        function(memo, num){return memo + num;
        });
			var tm = new TrackModel({name: habbits[i], progress:(progressSum*100/7).toFixed(2)});
  		var view = new TrackProgressView({model: tm});
  		$('#trackprogress').append(view.render().el)
  	}

  });//end progress-link bind click
});