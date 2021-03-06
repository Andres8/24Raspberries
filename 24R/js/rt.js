(function() {
  var cleanRT = {
   init: function(){
    this.box_office();
    this.top_dvd();
  },
  fetch: function(searched){
    $.getJSON("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=bfsqfcdktj8yt8bvu2d2fzq2&page_limit=5&q=" + searched + "&callback=?", function(data) {
     $.each(data.movies, function(i, movies) {
      var movie_obj = movies;
      $('.results').append("<div class='movie'>" + "<p><a href='" + movie_obj.posters.original + "'><img src='" + movie_obj.posters.detailed + "' /></a><a class='title' target=_blank href='" + movie_obj.links.alternate + "'>" + movie_obj.title + "</a></p>" + "<div class='meta'><div class='rating'>" + movie_obj.mpaa_rating + "</div><div class='score'><p>Critics:<span class='number'>" + movie_obj.ratings.critics_score + "&#37;" + "<span></p><p>Users:<span class='number'>" + movie_obj.ratings.audience_score + "&#37;" + "<span></p></div></div>");
    });
     cleanRT.color_code();
   });

  },
  box_office: function(){
    $.getJSON('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=bfsqfcdktj8yt8bvu2d2fzq2&limit=5&country=us&callback=?', function(data) {
     $.each(data.movies, function(i, movies) {
      var movie_obj = movies;
      $('.main-movies').append("<div id='movie-tile'>" + "<a href='#movie'><img src='" + movie_obj.posters.thumbnail + "' /></a><h5>"+ movie_obj.title + "</h5></br><h6>" + movie_obj.ratings.critics_score + "</h6></br><h6>"+movie_obj.abridged_cast[0].name +", "+ movie_obj.abridged_cast[1].name  + "</h6></br><h6>"+ movie_obj.mpaa_rating +", "+movie_obj.runtime + " min. </h6></br></div>");
    });
     cleanRT.color_code();
   });
  },
  top_dvd: function(){
    $.getJSON('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?apikey=bfsqfcdktj8yt8bvu2d2fzq2&limit=5&country=us&callback=?', function(data) {
     $.each(data.movies, function(i, movies) {
      var movie_obj = movies;
      $('.dvd').append("<div class='movie'>" + "<p><a href='" + movie_obj.posters.original + "'><img src='" + movie_obj.posters.detailed + "' /></a><a class='title' target=_blank href='" + movie_obj.links.alternate + "'>" + movie_obj.title + "</a></p>" + "<div class='meta'><div class='rating'>" + movie_obj.mpaa_rating + "</div><div class='score'><p>Critics:<span class='number'>" + movie_obj.ratings.critics_score + "&#37;" + "</span></p><p>Users:<span class='number'>" + movie_obj.ratings.audience_score + "&#37;" + "</span></p></div></div>");
    });
     cleanRT.color_code();
   });
  },

  color_code: function(){
    $('.number').each(function(){
      var theRating = $(this).html().split('%');
      if(theRating[0] < 50){
        $(this).addClass('rotten');
      }
      else{
        $(this).addClass('fresh');
      }
    });
  }
};

cleanRT.init();

$('#search').submit(function(e){
	e.preventDefault();
	var search = $('#search .movie_search').val();
	$('.results').empty();
	$(".movie_search").blur();
	cleanRT.fetch(search);
});

var pathArray = window.location.hash;
if( !(pathArray === "") ){
	var escPathArray = unescape(pathArray);
	var searchTerm = escPathArray.split('#');
	cleanRT.fetch(searchTerm[1]);
}

})();