var DayModel = Backbone.Model.extend({
	defaults: function() {
		return {
			name: "habit",
			order: habitsModel.nextOrder()
		};
	},

	initialize: function() {
		if (!this.get("name")) {
			this.set({"name": this.defaults().name});
		}
		if (!this.get("data")) {
			this.set("data", [0,0,0,0,0,0,0]);
		}
	}
});



var DailyHabitsList = Backbone.Collection.extend({
	model: DayModel,	
	localStorage: new Store("awesome-habits-backbone"),
	nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    }
});

var habitsModel = new DailyHabitsList;





var weekDays=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var habits=new Array();
habits.push("Drink at least 10 glasses of water every day");
habits.push("Eat a healthy diet");
habits.push("Spend at least 15 minutes a day learning a new skill");
habits.push("Be punctual");
habits.push("Brisk-walk at least 30 minutes a day");
habits.push("Brush teeth twice a day");
habits.push("Refrain from watching TV");

var dailyHabits=new Array();
for (var di = 0; di < 7; di++) {
  dailyHabits[di]=new Array();
  for (var hi = 0; hi < habits.length; hi++) {
    dailyHabits[di][hi]=0;
  }
}

habitsModel.fetch();
if (habitsModel.length < 7){
	habitsModel.reset();
_.each(weekDays,function(day, index){
	var dayModel = new DayModel({name:day,habits:habits});
	habitsModel.push(dayModel);
	habitsModel.at(index).save();	
});
}


var EachDay = Backbone.View.extend({
	el: $('#eachday'),

	render: function(){
		this.$el.append("<h2>Well, it's time to check in.</h2>");
		this.$el.append("<h3>Do this at the end of each day.</h3>");
		this.$el.append("<br>");
		console.log(currentDay);
		var todaysHabits=habitsModel.at(currentDay).get("habits");
		for (var hi = 0; hi < todaysHabits.length; hi++) {
    	notchecked_id='notchecked_'+hi;
    	checked_id='checked_'+hi;
    	var txt='';
    	txt+='<div id="'+notchecked_id+'" class="notchecked" style="display: none;">';
    	txt+='<button class="btn btn-mini btn-inverse">☐ '+habits[hi]+'</button>';
    	txt+='</div>';
    	txt+='<div id="'+checked_id+'" class="checked" style="display: none;">';
    	txt+='<button class="btn btn-mini">☑ '+habits[hi]+'</button>';
    	txt+='</div>';
    	txt+='<br>';
    	this.$el.append(txt);

			if (habitsModel.at(currentDay).get("data")[hi] == 0)
			{
				$("#"+notchecked_id).show();
			}
			else
			{
				$("#"+checked_id).show();
			}
		}
		$(".notchecked").click( function(e) { e.preventDefault(); var currentHabit=parseInt($(this).attr("id").replace(/^notchecked_/, "")); dailyHabits[currentDay][currentHabit]=1;habitsModel.at(currentDay).get("data")[currentHabit] = 1;habitsModel.at(currentDay).save(); $("#notchecked_"+currentHabit).hide(); $("#checked_"+currentHabit).show(); } );
  	$(".checked").click( function(e) { e.preventDefault(); var currentHabit=parseInt($(this).attr("id").replace(/^checked_/, "")); dailyHabits[currentDay][currentHabit]=0;habitsModel.at(currentDay).get("data")[currentHabit] = 0;habitsModel.at(currentDay).save(); $("#checked_"+currentHabit).hide(); $("#notchecked_"+currentHabit).show(); } );
	}
});

currentDay=0;
$(".visualstate").hide( "fast", function() { $("#eachday").show(); } );
var eachdayView = new EachDay;
eachdayView.render();


$(".pretend").click( function(e) { e.preventDefault(); currentDay=parseInt($(this).attr("id")); $(".visualstate").hide( "fast", function() { rewriteEachDayDivFromScratch(); $("#eachday").show(); } ); } );
$("#gohome").click( function(e) { e.preventDefault(); $(".visualstate").hide( "fast", function() { $("#welcomescreen").show(); } ); } );
function rewriteEachDayDivFromScratch()
{
  $("#eachday").html("");
  $("#eachday").append("<h2>Well, it's time to check in.</h2>");
  $("#eachday").append("<h3>Do this at the end of each day.</h3>");
  $("#eachday").append("<br>");
  var todaysHabits=dailyHabits[currentDay];
  for (var hi = 0; hi < todaysHabits.length; hi++) {
    notchecked_id='notchecked_'+hi;
    checked_id='checked_'+hi;
    var txt='';
    txt+='<div id="'+notchecked_id+'" class="notchecked" style="display: none;">';
    txt+='<button class="btn btn-mini btn-inverse">☐ '+habits[hi]+'</button>';
    txt+='</div>';
    txt+='<div id="'+checked_id+'" class="checked" style="display: none;">';
    txt+='<button class="btn btn-mini">☑ '+habits[hi]+'</button>';
    txt+='</div>';
    txt+='<br>';
    $("#eachday").append(txt);
    if (dailyHabits[currentDay][hi] == 0)
    {
      $("#"+notchecked_id).show();
    }
    else
    {
      $("#"+checked_id).show();
    }
  }
  $(".notchecked").click( function(e) { e.preventDefault(); var currentHabit=parseInt($(this).attr("id").replace(/^notchecked_/, "")); dailyHabits[currentDay][currentHabit]=1; $("#notchecked_"+currentHabit).hide(); $("#checked_"+currentHabit).show(); } );
  $(".checked").click( function(e) { e.preventDefault(); var currentHabit=parseInt($(this).attr("id").replace(/^checked_/, "")); dailyHabits[currentDay][currentHabit]=0; $("#checked_"+currentHabit).hide(); $("#notchecked_"+currentHabit).show(); } );
}







