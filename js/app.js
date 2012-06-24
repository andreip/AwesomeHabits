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

$(".pretend").click( function(e) {
  e.preventDefault();
  currentDay = $(e.currentTarget).attr('id')
  $('.visualstate').hide();
  rewriteEachDayDivFromScratch();
  $('#eachday').show();
});

$("#gohome").click( function(e) {
  e.preventDefault();
  $(".visualstate").hide();
  $("#welcomescreen").show();
});


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
}

/* This binds the click event to the function
 * now and also in the future. We need in the
 * future because there is no clue to when
 * the button .btn-mini will be rendered.
 */
$('.btn-mini').live('click', function(e) {
    e.preventDefault();
    // Capture the clicked button and its id
    var el = $(e.currentTarget);
    var id = el.parent('div').attr('id');

    el.toggleClass('btn-inverse');
    // Toggle value in model
    var todaysHabits = dailyHabits[currentDay];
    var val = 1 - todaysHabits[id]['checked'];
    todaysHabits[id]['checked'] = val;
    // Toggle the checkbox
    el.find('span.ascii-checkbox').text(checkBoxes[val]);
});
