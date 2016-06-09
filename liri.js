//grabs keys from twitter
var keys = require('./keys.js');
//loads twitter
var Twitter = require('twitter');
//arguments
var arg1 = process.argv[2];
var arg2 = process.argv[3];

var request = require('request');
var fs = require('fs');

//runs the functions
switch(arg1){
    case 'my-tweets':
        mytweets();
        break;
    case 'spotify-this-song':
        spotifysong();
        break;
    case 'movie-this':
        moviethis();
        break;
    case 'do-what-it-says':
        dowhat();
        break;
}

function mytweets() {
	
	var client = new Twitter(keys.twitterKeys);

	client.get('statuses/user_timeline', { screen_name: 'emsems12', count: 20 }, function(error, tweets, response) {

    if (error) {
    	console.log('There is an error: ' + error);
    }
    else {
      	for (var i = 0; i < 20; i++) {

  			console.log(tweets[i].created_at);
  			console.log(tweets[i].text);
  		}
    }
  });
}
