// SMHI API


// OMDb API
$('#button-new-movie').click(function() {
  // Gör en request med jQuery mot OMDb's API
  
  var movieURL = "http://www.omdbapi.com/?s=Spartacus&y=&plot=full&type=movie&r=json&";
  var posterURL = "http://img.omdbapi.com/?apikey=[" + key + "]&";
  var key;
  
  
  var username =  $("#spotifyusername").val();
  
  $.get(url+username, function(data, textStatus, jqXHR) {
    var responseBody = data;
    
    $('#spotify-response').text(responseBody.display_name);
  })
});
