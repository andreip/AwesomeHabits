var habits = App.Constants['HABITS'];
var weekDays = App.Constants['WEEKDAYS'];
var checkBoxes = App.Constants['CHECKBOXES'];

var dailyHabits = new Array();
for (var di = 0; di < 7; di++) {
  dailyHabits[di] = {};
  for (var hi = 0; hi < habits.length; hi++) {
    // Create independent memory address objects
    dailyHabits[di][_.uniqueId('button-')] = Object.create(habits[hi]);
  }
}

function rewriteEachDayDivFromScratch()
{
  // Reset the current eachday div
  el = $("#eachday")
  el.html("");

  /* Get today's habits and add them to a hashmap
   * of the form {'habits' : [ ... ]}.
   */
  var habits = [];
  var todaysHabits = dailyHabits[currentDay];
  for (var key in todaysHabits) {
    var checked = todaysHabits[key]['checked'];
    habit = {'checked': checked,
             'checkbox': checkBoxes[checked],
             'text': todaysHabits[key]['text'],
             'button_id': key
            };
    habits = habits.concat(habit);
  }
  params = { 'habits': habits };

  require(["text!templates/eachday.hjs"], function(tpl) {
    // Compile the template with params and get the html
    var template = Handlebars.compile(tpl);
    var html = template(params);

    // Render the html compiled template
    el.html(html)
  });

  $(".notchecked").click( function(e) { e.preventDefault(); var currentHabit=parseInt($(this).attr("id").replace(/^notchecked_/, "")); dailyHabits[currentDay][currentHabit]=1; $("#notchecked_"+currentHabit).hide(); $("#checked_"+currentHabit).show(); } );
  $(".checked").click( function(e) { e.preventDefault(); var currentHabit=parseInt($(this).attr("id").replace(/^checked_/, "")); dailyHabits[currentDay][currentHabit]=0; $("#checked_"+currentHabit).hide(); $("#notchecked_"+currentHabit).show(); } );
}
