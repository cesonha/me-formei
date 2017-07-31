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


var tweet = function() { 
var msg = 'Faltam ' + diffDays(new Date(2017, 07, 31)) + ' dias pra você se formar. Não desista!!';
Twitter.post('statuses/update', { status: msg }, function(err, data, response) {
  console.log(data)
})

}

var test = function() {
var msg = Math.floor(Math.random() * 100);
	Twitter.post('statuses/update', { status: "Testando umas baboseira - " + msg }, function(err, data, response) {
  console.log(data)
})
}

tweet();
test();
setInterval(tweet, 1000 * 30);
setInterval(tweet, 1000 * 60 * 60);