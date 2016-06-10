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
		//writes out tweets in console
	    if (!error) {
	    	for (var i = 0; i < tweets.length; i++) {
	  			console.log(tweets[i].created_at + " ");
	  			console.log(tweets[i].text);
	  			//writes tweets to log.txt
	  			fs.appendFileSync("./log.txt",'\n-----My Tweets-----' + ' \n' + tweets[i].created_at + ' \n' + tweets[i].text + ' \n', 'utf8', function(err) {
		    		if(err) {
		       	 		console.log(JSON.stringify(err));
		    		} 
				});
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
	    	var s = data.tracks.items[0];
	    	console.log('-----Spotify Results-----')
	        console.log('Artist(s): ' + s.artists[0].name)
	        console.log('Song Name: ' + s.name);
	        console.log('Preview Link: ' + s.preview_url);
	        console.log('Album: ' + s.album.name);

	    }
	    else {
	    	console.log(JSON.stringify(error));
	        return;
	    }

	    //adds songs to log.txt
        fs.appendFileSync("./log.txt", '\n' + '\n-----Spotify Results-----' + ' \n' + 'Artist(s): ' + s.artists[0].name + ' \n' + 'Song Name: ' + s.name + ' \n' + 'Preview Link: ' + s.preview_url + '\n' + 'Album: ' + s.album.name + '\n', 'utf8', function(err) {
    		if(err) {
       	 		console.log(JSON.stringify(err));
    		} 
		});
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
    		m = JSON.parse(body)
    		console.log('-----OMDB Results-----')
    		console.log('Title: ' + m.Title);
    		console.log('Year: ' + m.Year);
    		console.log('IMDB Rating: ' + m.imdbRating);
    		console.log('Country: ' + m.Country);
    		console.log('Language: ' + m.Language);
    		console.log('Plot: ' + m.Plot);
    		console.log('Actors: ' + m.Actors);
    		console.log('Rotten Tomatoes Rating: ' + m.tomatoRating);
    		console.log('Rotten Tomatoes URL: ' + m.tomatoURL);
  		}
  		else {
  			console.log(JSON.stringify(error));
	        return;
  		}
  		//writes omdb movie to log.txt
  		fs.appendFileSync("./log.txt", '\n' + '\n-----OMDB Results----- ' + ' \n' + 'Title: ' + m.Title + ' \n' + 'Year: ' + m.Year + ' \n' + 'IMDB Rating: ' + m.imdbRating + '\n' + 'Country: ' + m.Country + ' \n' + 'Language: ' + m.Language + ' \n' + 'Plot: ' + m.Plot + ' \n' + 'Actors: ' + m.Actors + ' \n' + 'Rotten Tomatoes Rating: ' + m.tomatoRating + ' \n' + 'Rotten Tomatoes URL: ' + m.tomatoURL + ' \n', 'utf8', function(err) {
    		if(err) {
       	 		console.log(JSON.stringify(err));
    		} 
		});
  		
	})
}
//do-what-it-says function grabs random.txt file data
function dowhat() {

	fs.readFile("random.txt", "utf8", function(error, data) {
		
		if (!error) {
		    // makes array of data
		    var args = data.split(',');
		    console.log(args)
		    // store arguments as var defined in switch function
		 	arg1 = args[0];
		 	arg2 = args[1];
		 	start();
		}
		else {
			console.log(JSON.stringify(error));
		}

	})
}



start(arg1,arg2);
