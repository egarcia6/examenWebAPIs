const api ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=de4c9ee7cda803d05775853a6881251a';
const apiImage="https://image.tmdb.org/t/p/w500/";
const apiGenre = 'https://api.themoviedb.org/3/genre/movie/list?sort_by=popularity.desc&api_key=de4c9ee7cda803d05775853a6881251a'
const apiTv = "https://api.themoviedb.org/3/tv/popular?sort_by=popularity.desc&api_key=de4c9ee7cda803d05775853a6881251a"
fetch(api)
.then(response => response.json())
.then(async data => {
  /**let element = document.getElementById('MovieImage');
  let movie = document.getElementById('MovieName');
  let releaseDate = document.getElementById('releaseDate');
  let review = document.getElementById('review');
  element.src = apiImage + data.poster_path
  movie.innerHTML = data.title
  review.innerHTML = data.overview

   while(contador => 0){
    console.log(data.results[contador].title)
    console.log(data.results[contador].overview)
    console.log(data.results[contador].release_date)
    console.log(data.results[contador].id)
    contador--;
    
  }

  let contador = Object.keys(data).length
  console.log(Object.keys(data).length)
  
  releaseDate.innerHTML = "Lanzamiento " + data.release_date 
  console.log(element.innerHTML)**/
  
}).catch(console.error);

getMovies(api);


async function getMovies2(){
  let movies = await fetch(api).then(response => response.json())
  console.log("Getting Movies");
  setTimeout(() =>  {
    console.log("Getting Movies");
    let contador = Object.keys(movies.results).length -1
    let main = document.getElementById("main")
    main.innerHTML = '<div class="w3-row-padding w3-padding-30 w3-center" id="food"></div><div class="w3-quarter"></div><img id="MovieImage" src="" alt="Sandwich" style="width:100%"></img><p id="releaseDate"></p><h3 id="MovieName">The Perfect Sandwich, A Real NYC Classic</h3><p id="releaseDate"></p><p id="review">Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.</p>'
    let image = document.getElementById("movieImage")
    image.src = apiImage + movies.results[contador].poster_path
    while(contador > 0){
      console.log(movies.results[contador].title);
      contador--;
    }
  }, 2000);
  return movies.results;
}

async function getTitles(){
  let titles = await getMovies()
  console.log(titles)
  return titles
}
//getTitles();

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        console.log(data.results.length)
        if(data.results.length !== 0){
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}



function showMovies(data) {
  main.innerHTML = '';
  data.forEach(movie => {
      const {title, poster_path, release_date, overview, id } = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
      <div class="movie-info">
              <h3>${title}</h3>
          </div>
           <img src="${poster_path? apiImage+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
          <div class="overview">
          <h8>Lanzamiento: ${release_date}</h8>
              <h2>Reseña</h2>
              ${overview}
              <br/> 
              <button class="Like" id="${id}">Like</button
          </div>
      
      `
      main.appendChild(movieEl);

      document.getElementById(id).addEventListener('click', () => {
        console.log(id)
        let element = getElementById("id");
        element.setBlueButton(true);
      })
  })
}

var selectedGenre = []
setGenre();

function setGenre() {
  
  fetch(apiGenre).then(res => res.json()).then(data => {
  console.log(data.genres)
  showgener(data.genres)
    }
  )
}

function showgener (data){
  
  const select = document.getElementById("category")

  data.forEach(genres => {
    let gener = document.createElement('option')
    const {id, name} = genres;
    gener.value = `value=${id}`
    gener.innerHTML = `${name}`
    select.appendChild(gener);
  })
}


function getCategory(){ 
  const option = document.getElementById('category').options[select.selectedIndex].value; 
  console.log("Getting new movies " + option)
  var newLink = "";
  if(option==="tv"){
    newLink = apiTv
  } else{
     newLink = api + '&with_genres=' + String(option).replace("value=","") ;
  }
 
  console.log(newLink)
  getMovies(newLink)
}

const select = document.getElementById("category")

select.addEventListener('click', () => {
  getCategory();
})
