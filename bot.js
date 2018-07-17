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

var getMilestoneMsg = function(msgs, days) {
	return msgs[6 - (days / 10)]
}

var getPercentageBar = function(daysLeft) {
	var perc = 100 - (100 * (daysLeft / 365))
	var text = ""
	for (i = 0; i < 20; i++) {
		if (perc >= (i+1) * 5) {
    		text += "█"
    	}
    	else {
    		text += "▒"
    	}
	}
	text += " " + perc.toFixed(2) + "%"
	return text
}

var motivationalMsgs = ["ÚLTIMO GÁS DALE DALE DALE DALE PUTAQUEPARIU!!", "Vai Cesar, pensa que falta menos de um ano já mano!", "Compra uma cervejinha boa amanhã, você merece!!", "o IME é legal mas legal mesmo é não precisar mais estudar sob pressão", "Agradeça seus amigos que sem eles você não tava aqui MULEQUE", "VEJA A LUZ NO FIM DO TÚNEL!!", "Você é muito mais do que suas notas AHSDUIHFSUBSF"];
var milestoneMsgs = ["2 MESES MANO, DOIS FUCKING MESES!!! VAI CARALHO!", "50tinha lek, vai na fé.", "em 40 dias VC TÁ OBRIGADO A DORMIR POR 2 DIAS SEGUIDOS", "O COMEÇO DO FIM, ÚLTIMO MÊS, AAAAAAAAAA", "20 DIAS MANO 20 FJUCKIASDFSSGFSGJ", "COMEÇA A CONTAGEM REGRESSIVA, DEZ DIAS PRO FIM"]
var tweet = function() { 
var msg = getPercentageBar(diffDays(new Date()))
var remainingDays = diffDays(new Date())
if (remainingDays < 0) return
else if (remainingDays == 0) {
	msg += '\nACABOU, PORRAAAAAAAAA, NÃO TEVE HEXA MAS TEVE DIPLOMAAAA!! PAU NO CU DO MUNDO E PARABÉNS SMDOIGSNGSGUSEIRBDGSGFSAFA'
}
else if (remainingDays < 10) {
	msg += '\n' + remainingDays + '!!!';
}
else if (remainingDays % 10 == 0 && remainingDays <= 60) {
	msg += '\nFaltam ' + remainingDays + ' dias pra você se formar! ' + getMilestoneMsg(milestoneMsgs, remainingDays);
}
else { 
	msg += '\nFaltam ' + remainingDays + ' dias pra você se formar! ' + getRandomMsg(motivationalMsgs);
} 
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
