// import { request } from "http";
require("dotenv").config();
var keys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
// var omdb = require('omdb');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var action = process.argv[2];
let nodeArgs = process.argv;

var userSearch = "";
for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length){
        userSearch = userSearch + "+" + nodeArgs[i];
    }
    else{
        userSearch += nodeArgs[i];
    }
}
// if(action == "do-what-it-says"){
//   fs.readFile("random.txt", "utf8", function(error, data) {
//     if (error) {
//       return console.log(error);
//     }
//     // console.log(data);
//     action = data.split(" ",1);
//     process.argv[3] = data.split(" ")
//     console.log("ACTION: " + action);
//   });
// }
// console.log("ACTION: " + action);
switch(action){
// * `my-tweets`
case "my-tweets":
var params = {screen_name: '@IceQueenofMN'};
client.get('statuses/user_timeline', params, twitterData);
function twitterData(error, tweets, response) {
    if(!error){
        for(i=0; i<5; i++){ 
        console.log(tweets[i].text + "\n" + tweets[i].created_at);
        }
    }
};
break;

// * `spotify-this-song` 
case "spotify-this-song":
let userSearch = process.argv[3]
spotify.search({ type: 'track', query: userSearch}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // if (!userSearch){userSearch = "The Sign"}
    console.log("Album Name: " + data.tracks.items[i].album.name + 
    "\nArtist: " + data.tracks.items[i].artists[0].name +
    "\nSong Name: " + data.tracks.items[i].name +
    "\nLink: " + data.tracks.items[i].external_urls.spotify)
  });
break;

// * `movie-this`
case "movie-this":
let nodeArgs = process.argv;
var movieName = "";
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}
if (!movieName){movieName = "Mr Nobody"}


var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(
"Title: " + JSON.parse(body).Title +
"\nRelease Year: " + JSON.parse(body).Year +
"\nIMDB Rating: " +  JSON.parse(body).imdbRating +
"\nRotten Tomatoes: " + JSON.parse(body).Ratings[1].Value +
"\nPRoduction Country: " + JSON.parse(body).Country +
"\nLanguage: " + JSON.parse(body).Language +
"\nPlot: " + JSON.parse(body).Plot +
"\nMain Actors: "+ JSON.parse(body).Actors);
}
});

break;

// * `do-what-it-says`
case "do-what-it-says":
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
  });

}
