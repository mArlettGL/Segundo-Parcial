const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=c36e29d0d0f3a613b33d726c96ac359b&language=es-ES';
const GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c36e29d0d0f3a613b33d726c96ac359b&language=es-ES';
const TVPOPULARES = 'https://api.themoviedb.org/3/tv/popular?api_key=c36e29d0d0f3a613b33d726c96ac359b&language=es-ES';

var catalogo = document.getElementById('catalogo_movies');
var carosel = document.getElementById('movies');
var tvpop = document.getElementById('pop'); 

async function gettvpopular(){
  var popular = await fetch(TVPOPULARES);
  var data_popular = await popular.json();

  var response_genres = await fetch(GENRES);
  var data_genres = await response_genres.json();
  var results = data_popular.results;

  results.forEach(a => {
    tvpop.innerHTML +=
    `<div class="col-xs-12 col-sm-6 col-lg-4">
    <div class="card">
      <img class="card-img-top img-fluid" src="https://image.tmdb.org/t/p/original${a.poster_path}" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">${a.name}</h4>
        <p class="card-text">${a.popularity}</p>
      </div>
    </div>
  </div>`
  })
}

async function  getMovies(){
  var response = await fetch(URL);
  var data = await response.json();

  var response_genres = await fetch(GENRES);
  var data_genres = await response_genres.json();
  var results = data.results;

  results.forEach(m => {
    var generos = data_genres.genres;
    var genero = generos.filter(g => {
      return g.id === m.genre_ids[0];
    });
    
    catalogo.innerHTML += 
    `<div class="col-xs-12 col-sm-6 col-lg-4">
    <div class="card">
      <img class="card-img-top img-fluid" src="https://image.tmdb.org/t/p/original${m.poster_path}" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">${m.title}</h4>
        <p class="card-text">${m.release_date}</p>
        <p class="card-text">${genero[0].name}</p>
      </div>
    </div>
  </div>`
  });
}

