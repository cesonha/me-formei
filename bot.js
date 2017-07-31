var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);


var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var goalDate = new Date(2018,07,31);
var diffDays = function (today) { 
	return Math.round(Math.abs((today.getTime() - goalDate.getTime())/(oneDay)));
}

var getRandomMsg = function(msgs) {
	return msgs[Math.floor(Math.random() * msgs.length)];
}

var motivationalMsgs = ["Vai Cesar, pensa que falta menos de um ano já mano!", "o IME é legal mas legal mesmo é não precisar mais estudar sob pressão", "VEJA A LUZ NO FIM DO TÚNEL!!", "Você é muito mais do que suas notas AHSDUIHFSUBSF"];
var tweet = function() { 
var msg = 'Faltam ' + diffDays(new Date(2017, 07, 31)) + ' dias pra você se formar! ' + getRandomMsg(motivationalMsgs);
Twitter.post('statuses/update', { status: msg }, function(err, data, response) {
  console.log(data)
})

}
var routine = function() {

Twitter.get('statuses/user_timeline', { screen_name: 'acaba_faculdade', count: 1}, function(err, data, response) {
  var lastTweet = data[0]["text"];
  var daysLeft = diffDays(new Date(2017, 07, 31)).toString();
  if (lastTweet.indexOf(daysLeft) == -1) { 
  	tweet();
  };

})

}

routine();
setInterval(routine, 1000);