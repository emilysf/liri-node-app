//grabs keys from twitter
var keys = require('./keys.js');
//loads twitter
var Twitter = require('twitter');
//loads spotify
var spotify = require('spotify');
//arguments
var arg1 = process.argv[2];
var arg2 = process.argv[3];
var args = process.argv;
//loads omdb
var request = require('request');
var fs = require('fs');

function start(arg1,arg2) {
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
}
//loads tweets from twitter
function mytweets() {
	//gets twitter app keys
	var client = new Twitter(keys.twitterKeys);
	var params = { screen_name: 'emsems12', count: 20 };
	client.get('statuses/user_timeline', params , function(error, tweets, response) {

    if (!error) {
    	
    	for (var i = 0; i < tweets.length; i++) {
  			console.log(tweets[i].created_at + " ");
  			console.log(tweets[i].text);
  		}
    }
    else {
      	console.log(JSON.stringify(error));
    }
  });
}
//grabs spotify songs
function spotifysong() {

	if (arg2 === undefined) {
		arg2 = "what's my age again";
	}

	spotify.search({ type: 'track', query: arg2 }, function(err, data) {
	    if ( !err ) {

	    	// console.log(data);
	    	console.log('-----Spotify Results-----')
	        console.log('Artist(s): ' + data.tracks.items[0].artists[0].name)
	        console.log('Song Name: ' + data.tracks.items[0].name);
	        console.log('Preview Link: ' + data.tracks.items[0].preview_url);
	        console.log('Album: ' + data.tracks.items[0].album.name);
	    }
	    else {
	    	console.log('There is an error: ' + err);
	        return;
	    }
	});
}
//grabs movie information from omdb
function moviethis() {

	var moviename = "";
	//loops through movies entered in console
	for (var i = 3; i < args.length; i++){

   	 	if (i > 3 && i < args.length){
			moviename = moviename + "+" + args[i];
   		}
		else {
        	moviename = moviename + args[i];
    	}
	}

	if (arg2 === undefined) {
  			moviename = "Mr. Nobody";
	
  		}
	//pulling from the omdb api
	var options = {
		url: 'http://www.omdbapi.com/',
		qs: {
			t: moviename,
			plot: 'short',
			r: 'json',
			tomatoes: true

		}
	}

	request(options, function(error, response, body) {
  		if (!error && response.statusCode == 200) {
    		b = JSON.parse(body)
    		console.log('-----OMDB Results-----')
    		console.log('Title: ' + b.Title);
    		console.log('Year: ' + b.Year);
    		console.log('IMDB Rating: ' + b.imdbRating);
    		console.log('Country: ' + b.Country);
    		console.log('Language: ' + b.Language);
    		console.log('Plot: ' + b.Plot);
    		console.log('Actors: ' + b.Actors);
    		console.log('Rotten Tomatoes Rating: ' + b.tomatoRating);
    		console.log('Rotten Tomatoes URL: ' + b.tomatoURL);
  		}
  		else {
  			console.log('There is an error: ' + err);
	        return;
  		}
  		
	})
}

start(arg1,arg2);