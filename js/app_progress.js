/* track progress */
$(function(){

	var TrackModel = Backbone.Model.extend({
			initialize: function() {
			if (!this.get("name")){
				this.set({"name":"habit"}); 
				this.set({"progress":32});
				}
			}
	});

  var TrackProgressEntryView = Backbone.View.extend({
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

  var TrackProgressView = Backbone.View.extend({
    el: $('#trackprogress'),

    events: {
      "click #progress-link": "show"
    },

    initialize: function() {
      $('#progress-link').bind('click', this.show);
      this.$el.hide();

    },

    show: function(){
      console.log("in show");
      window.track.render();
      $(".visualstate").hide( "fast", function() { 
        $('#trackprogress').show();
      });
      
    },
    

    render: function(){
      this.$el.children().remove();    
      
      var allData = window.dailyHabits
      var habits = window.habits    
      for (var i = 0;i<habits.length;i++){
        var progressData = _.map(allData, 
          function(dataForADay){return dataForADay[i];
          });
        var progressSum = _.reduce(progressData, 
          function(memo, num){return memo + num;
          });
        var tm = new TrackModel({name: habits[i], progress:(progressSum*100/7).toFixed(2)});
        var view = new TrackProgressEntryView({model: tm});
        this.$el.append(view.render().el)        
      }

      return this.el;
    }
  });

  var trackview = new TrackProgressView;
  trackview.render();
  window.track = trackview;
});