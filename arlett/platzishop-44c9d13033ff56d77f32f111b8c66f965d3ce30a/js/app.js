const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=c36e29d0d0f3a613b33d726c96ac359b&language=es-ES';
const GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c36e29d0d0f3a613b33d726c96ac359b&language=es-ES';
const TVPOPULARES = 'https://api.themoviedb.org/3/tv/popular?api_key=c36e29d0d0f3a613b33d726c96ac359b&language=es-ES';
const genres = [
  {
      "id": 28,
      "name": "Acción"
  },
  {
      "id": 12,
      "name": "Aventura"
  },
  {
      "id": 16,
      "name": "Animación"
  },
  {
      "id": 35,
      "name": "Comedia"
  },
  {
      "id": 80,
      "name": "Crimen"
  },
  {
      "id": 99,
      "name": "Documental"
  },
  {
      "id": 18,
      "name": "Drama"
  },
  {
      "id": 10751,
      "name": "Familia"
  },
  {
      "id": 14,
      "name": "Fantasía"
  },
  {
      "id": 36,
      "name": "Historia"
  },
  {
      "id": 27,
      "name": "Terror"
  },
  {
      "id": 10402,
      "name": "Música"
  },
  {
      "id": 9648,
      "name": "Misterio"
  },
  {
      "id": 10749,
      "name": "Romance"
  },
  {
      "id": 878,
      "name": "Ciencia ficción"
  },
  {
      "id": 10770,
      "name": "Película de TV"
  },
  {
      "id": 53,
      "name": "Suspense"
  },
  {
      "id": 10752,
      "name": "Bélica"
  },
  {
      "id": 37,
      "name": "Western"
  }
]

var catalogo = document.getElementById('catalogo_movies');
var carrusel = document.getElementById('movies');
var tvpop = document.getElementById('pop'); 
var tagsEl = document.getElementById('tags');
var selectgenre = [];

setGenre();
function setGenre() {
  tagsEl.innerHTML='';
  genres.forEach(genre =>{
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id=genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if(selectgenre.length == 0){
        selectgenre.push(genre.id);
      }
      else{
        if(selectgenre.includes(genre.id)){
          selectgenre.forEach((id,idx) =>{
            if(id == genre.id){
              selectgenre.splic(idx,1);
            }
          })
        }else {
          selectgenre.push(genre.id);
        }
      }console.log(selectgenre)
      getMovies(API_URL+'&with_genres='+encodeURI(selectgenre.join(',')))
    })
    tagsEl.append(t);

  })
}

async function gettvpopular(){
  var popular = await fetch(TVPOPULARES);
  var data_popular = await popular.json();
  var results = data_popular.results;
  results.forEach(data_popular => {
    tvpop.innerHTML +=
    `<div class="col-xs-12 col-sm-6 col-lg-4">
    <div class="card">
      <img class="card-img-top img-fluid" src="https://image.tmdb.org/t/p/original${data_popular.poster_path}" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">${data_popular.name}</h4>
        <p class="card-text">${data_popular.popularity}</p>
      </div>
    </div>
  </div>`
  });
}



async function  getMovies(){
  var response = await fetch(API_URL);
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




