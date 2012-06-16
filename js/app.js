var weekDays=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var habits=new Array();
habits.push("Drink at least 10 glasses of water every day");
habits.push("Eat a healthy diet");
habits.push("Spend at least 15 minutes a day learning a new technology");
habits.push("Be punctual");
habits.push("Brisk-walk at least 30 minutes a day");
habits.push("Brush teeth twice a day");
habits.push("Help a friend");
habits.push("Refrain from watching TV");
var dailyHabits=new Array();
for (var di = 0; di < 7; di++) {
  dailyHabits[di]=new Array();
  for (var hi = 0; hi < habits.length; hi++) {
    dailyHabits[di][hi]=0;
  }
}
$("#notchecked_0_1").click( function(e) { e.preventDefault(); dailyHabits[0][1]=1; $("#notchecked_0_1").hide(); $("#checked_0_1").show(); } )
$("#checked_0_1").click( function(e) { e.preventDefault(); dailyHabits[0][1]=0; $("#checked_0_1").hide(); $("#notchecked_0_1").show(); } )

