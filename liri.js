var input = process.argv[2];
var nodeArray = process.argv;

//Global Variable for Twitter
var Twitter = require('twitter');
var twitterJsFile = require('./key.js');
var twitterKeys = twitterJsFile.twitterKeys;
var twitter = new Twitter(twitterKeys);
var screenname = { screen_name: 'hsharpe2777' };

//Global variables for Spotify
var spotify = require('spotify');
var songName = "";


//loop through all of the words in the node argument 
//to capture all of the words in the song title and store 
//them in the songname variable 
for (var i = 3; i < nodeArray.length; i++) {

    if (i > 3 && i < nodeArray.length) {
        //add "nodeArray[i] to the song name string
        songName = songName + "+" + nodeArray[i];
    } else {
        songName += nodeArray[i];

    }
}


//Global variables for imdb
var imdb = require('imdb-api');
var movieName = "";

//loop through all of the words in the node argument 
//to capture all of the words in the song title and store 
//them in the songname variable 
for (var i = 3; i < nodeArray.length; i++) {

    if (i > 3 && i < nodeArray.length) {
        //add "nodeArray[i] to the song name string
        movieName = movieName + "+" + nodeArray[i];
    } else {
        movieName += nodeArray[i];

    }
}


//If user inputs "movie-this"
if (input === "movie-this") {
    //search movie
    imdb.getReq({ name: movieName }, (err, things) => {
        movie = things;
        console.log("Title: " + movie.title);
        console.log("Year: " + movie.year);
        console.log("IMDB Rating: " + movie.ratings[0].Value);
        console.log("Country: " + movie.country);
        console.log("Language(s): " + movie.languages);
        console.log("Plot: " + movie.plot);
        console.log("Actors: " + movie.actors);
        console.log("URL: " + movie.imdburl);
    });

}


//If user inputs "spotify"
if (input === "spotify") {
    //search song
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (!err) {
            //print out the artist(s) name
            console.log("Artist(s): " + data.tracks.items[1].album.artists[0].name);
            //print out the song name
            console.log("Song Name: " + data.tracks.items[1].name);
            //print out the url to the song
            console.log("URL: " + data.tracks.items[1].album.external_urls.spotify);
            //print out the album name
            console.log("Album: " + data.tracks.items[1].album.name);

            //else if there is an error, throw an error message
        } else if (err) {
            console.log('The following error has occured: ' + err);
        }
    });
}


//If user inputs "my-tweets"
if (input === "my-tweets") {
    //get tweets
    twitter.get('statuses/user_timeline', screenname, function(error, tweets, response) {
        //if there are no errors
        if (!error) {
        	//if number of tweets is less than 20
            if (tweets.length < 20) {
                // for each tweet
                for (var i = 0; i < tweets.length; i++) {
                    //print out the text 
                    console.log(tweets[i].text);
                }
            } else {
            	//if number of tweets is more than 20
            	//only print our 20 tweets
                for (var i = 0; i < 20; i++) {
                    //print out the text 
                    console.log(tweets[i].text);
                }
            }

            //else if there is an error, throw an error message
        } else if (error) {
            console.log('The following error has occured: ' + error);
        }
    });
};
