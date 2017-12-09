var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);


var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var goalDate = new Date(2018,07,01);
var diffDays = function (today) { 
	return Math.round(Math.abs((today.getTime() - goalDate.getTime())/(oneDay)));
}

var getRandomMsg = function(msgs) {
	return msgs[Math.floor(Math.random() * msgs.length)];
}

var getPercentageBar = function(daysLeft) {
	var perc = 100 - (100 * (daysLeft / 365))
	var text = ""
	for (i = 0; i < 20; i++) {
		if (perc > (i+1) * 5) {
    		text += "█"
    	}
    	else {
    		text += "▒"
    	}
	}
	text += " " + perc.toFixed(2) + "%"
	return text
}

var motivationalMsgs = ["VAI CUZÃO!!", "Vai Cesar, pensa que falta menos de um ano já mano!", "Compra uma cervejinha boa amanhã, você merece!!", "o IME é legal mas legal mesmo é não precisar mais estudar sob pressão", "Never gonna give you up", "VEJA A LUZ NO FIM DO TÚNEL!!", "Você é muito mais do que suas notas AHSDUIHFSUBSF"];
var tweet = function() { 
var msg = getPercentageBar(diffDays(new Date()))
msg += '\nFaltam ' + diffDays(new Date()) + ' dias pra você se formar! ' + getRandomMsg(motivationalMsgs);

Twitter.post('statuses/update', { status: msg }, function(err, data, response) {
  console.log(data)
})

}
var routine = function() {

Twitter.get('statuses/user_timeline', { screen_name: 'acaba_faculdade', count: 1}, function(err, data, response) {
  var lastTweet = data[0]["text"];
  var daysLeft = diffDays(new Date()).toString();
  if (lastTweet.indexOf(daysLeft) == -1) { 
  	tweet();
  };

})

}

routine();
setInterval(routine, 1000 * 60 * 60 * 8);
