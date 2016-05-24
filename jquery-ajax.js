// what you can do outside...
var outsideActivities = [
    'Go and play cricket.'
    , 'Hang in the park with firends.'
    , 'Drink vine in a hammock.'
    , 'Go for a swim.'
    , 'Do a cartwheel. (If you can...)'
    , 'Take a stroll.'
    , 'Pool-party!'
    , 'Take ride with your bike.'
    , 'Fly a kite.'
    , 'Look at the clouds.'
];

// Stockholm lon & lat
lat = 59.33;
lon = 18.06;


//generate random IMDB Id
function randomID() {
    randomImdbId = "tt";
    for (i = 0; i < 7; i++) {
        randomImdbId = randomImdbId + Math.floor((Math.random() * 10) + 1);
    }
    return randomImdbId;
}


App.controller('home', function (page) {

    // SMHI API  
    var weatherData = "http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + lat + "/lon/" + lon + "/data.json";

    // randOutsideActivitie
    var randOutsideActivitie = outsideActivities[Math.floor(Math.random() * outsideActivities.length)];

    $.get(weatherData, function (data, textStatus, jqXHR) {
        // temp and cludyness 
        var temp = data.timeseries[0].t;
        var cloudyness = data.timeseries[0].tcc;

        // if temp is over 15 celcius abd cloudyness = or < then 6/8, tell user to go outside
        if (temp > 15 && cloudyness <= 6) {
            $('#weather-status').text("It´s warm and sunny outside! " + randOutsideActivitie);
            $('#movie-poster').attr("src", "http://www.publicdomainpictures.net/pictures/50000/nahled/smiling-sun-face-in-sunglasses.jpg");
            $('#button-new-movie').text("Watch a movie anyway!");

        } else {
            $('#weather-status').text("Its cold outside, stay in and watcha  movie!");
            $('#movie-poster').attr("src", "http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif");
            newMovie();
        }
    });


    // new movie button
    $(page).find('#button-new-movie').click(function () {
        $('#movie-poster').show().attr("src", "http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif");
        resetText();
        newMovie();
    });

});

function newMovie() {
    // key for poster
    var APIKey = 88714077;
    // OMDb URL
    var movieURL2 = "http://www.omdbapi.com/?i=" + randomID() + "&y=&plot=full&r=json";

    $.get(movieURL2, function (data, textStatus, jqXHR) {
        var imdbPosterURL = "http://img.omdbapi.com/?i=" + data.imdbID + "&apikey=" + APIKey;
        var imdbTitle = data.Title;
        var imdbYear = data.Year;
        var imdbGenre = data.Genre;
        var imdbRating = data.imdbRating;
        var imdbPlot = data.Plot;
        var imdbType = data.Type;
        var imdbLink = "http://www.imdb.com/title/"+data.imdbID

        //if varimdb.. undefined reset text and newMovie()  
        if (imdbTitle == "undefined" || imdbYear == "undefined" || imdbGenre == "undefined" || imdbRating == "undefined" || imdbPlot == "undefined" || imdbType != "movie") {
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
            
            // set link
            $('#movie-link').attr("href", imdbLink).text("IMDb link");

        }
    });
}

function resetText() {
    // set title and release year  
    $('#movie-titel-and-year').text("");

    // set genre and rating 
    $('#movie-genre-and-rating').text("");

    // set plot
    $('#movie-plot').text("");
    
    // set link
    $('#movie-link').text("");
}

function imgError(image) {
    $(image).attr("src", "https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=b5f8f85be8df08337531c9d2941d3a1a");
}



try {
    App.restore();
} catch (err) {
    App.load('home');
}
