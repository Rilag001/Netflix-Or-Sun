var movies = [
        'The Shawshank Redemption', 
        'The Godfather', 
        'The Godfather Part II', 
        'The Dark Night',
        'Schindlers List',
        '12 Angry Men',
        'Pulp Fiction',
        'The Lord of the Rings The Return of the King',
        'The Good, the Bad and the Ugly',
        'Fight Club',
        'The Lord of the Rings The Fellowship of the Ring',
        'Star Wars: Episode V The Empire Strikes Back',
        'Forrest Gump',
        'Inception',
        'The Lord of the Rings The Two Towers',
        'One Flew Over the Cuckoos Nest',
        'Goodfellas',
        'The Matrix',
        'Seven Samurai',
        'Star Wars: Episode IV  A New Hope',
        'City of God',
        'Se7en',
        'The Silence of the Lambs',
        'Its a Wonderful Life',
        'The Usual Suspects',
        'Léon: The Professional',
        'Once Upon a Time in the West',
        'Spirited Away',
        'Saving Private Ryan',
        'American History X',
        'Interstellar',
        'Casablanca',
        'Psycho',
        'Raiders of the Lost Ark',
        'The Intouchables',
        'Rear Window',
        'Modern Times',
        'The Green Mile ',
        'Terminator 2: Judgment Day',
        'The Pianist',
        'The Departed ',
        'Back to the Future ',
        'Whiplash',
        'Gladiator',
        'Memento',
        'Apocalypse Now',
        'The Prestige',
        'The Lion King'
    ];    

    // what you can do outside...
    var outsideActivities = [
        'Go and play cricket.', 
        'Hang in the park with firends.', 
        'Drink vine in a hammock.', 
        'Go for a swim.',
        'Do a cartwheel. (If you can...)',
        'Take a stroll.',
        'Pool-party!',
        'Take ride with your bike.',
        'Fly a kite.',
        'Look at the clouds.'
    ];   

    // Stockholm lon & lat
    lat = 59.33;
    lon = 18.06;


    //generate random IMDB Id
function randomID(){
     ranbdomImdbId = "tt";
    for (i = 0; i < 7; i++) { 
        ranbdomImdbId = ranbdomImdbId + Math.floor((Math.random() * 10) + 1); 
    }
    return ranbdomImdbId;

}
   
    
    App.controller('home', function (page) {
    
    // SMHI API  
    var weatherData = "http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + lat + "/lon/" + lon + "/data.json"; 
    var randMovie = movies[Math.floor(Math.random() * movies.length)];
    var randOutsideActivitie = outsideActivities[Math.floor(Math.random() * outsideActivities.length)];
  
    $.get(weatherData, function(data, textStatus, jqXHR) {
        // temp and cludyness 
        var temp = data.timeseries[0].t;  
        var cloudyness = data.timeseries[0].tcc;  

      // if temp is over 15 celcius abd cloudyness = or < then 6/8, tell user to go outside
      if(temp > 15 && cloudyness <= 6){
          $('#weather-status').text("It´s warm and sunny outside! " + randOutsideActivitie);
          $('#movie-poster').attr("src", "http://www.publicdomainpictures.net/pictures/50000/nahled/smiling-sun-face-in-sunglasses.jpg");
          $('#button-new-movie').text("Watch a movie anyway!");

      } else {
          $('#weather-status').text("Its cold outside, stay in and watcha  movie!");
          $('#movie-poster').attr("src", "http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif");
          newMovie();
      }      
    });
         
                                               
        // new movie, OMDb API
        $(page).find('#button-new-movie').click(function() {
            $('#movie-poster').show().attr("src", "http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif");
            resetText();
            newMovie();
        });

      });
        
    function newMovie(){
      var randMovie = movies[Math.floor(Math.random() * movies.length)];
      // Gör en request med jQuery mot OMDb's API    
      var APIKey = 88714077;
      //var movieURL = "http://www.omdbapi.com/?t="+ randMovie +"&y=&plot=full&r=json";
      var movieURL2 = "http://www.omdbapi.com/?i="+ randomID() +"&y=&plot=full&r=json";

      $.get(movieURL2, function(data, textStatus, jqXHR) {

        var imdbPosterURL = "http://img.omdbapi.com/?i="+ data.imdbID +"&apikey=" + APIKey;
          var posterUrlIsOk;
          //"http://img.omdbapi.com/?i=tt0416449&apikey=88714077"
        var imdbTitle = data.Title;
        var imdbYear = data.Year;
        var imdbGenre = data.Genre;
        var imdbRating = data.imdbRating;
        var imdbPlot = data.Plot;
        var imdbType = data.Type;
          
    
        
          
        if(imdbTitle == "undefined" || imdbYear == "undefined" || imdbGenre == "undefined" || imdbRating == "undefined" || imdbPlot == "undefined" || imdbType != "movie") { 
            resetText(); 
            newMovie();
          } else {
              // set title and release year  
              $('#movie-titel-and-year').text(imdbTitle + " (" + imdbYear + ")");

              // set genre and rating 
              $('#movie-genre-and-rating').text("Genre: " + imdbGenre + " || " + "IMDB rating: " + imdbRating);

              // set plot
              $('#movie-plot').text(imdbPlot);

              // set poster
              $('#movie-poster').attr("src", imdbPosterURL);
          
          }
      });
    }

        function resetText(){
            // set title and release year  
            $('#movie-titel-and-year').text("...");

            // set genre and rating 
            $('#movie-genre-and-rating').text("...");

            // set plot
            $('#movie-plot').text("...");
        }

        function imgError(image){
            $(image).attr("src", "https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=b5f8f85be8df08337531c9d2941d3a1a");
        }



      try {
        App.restore();
      } catch (err) {
        App.load('home');
      }
