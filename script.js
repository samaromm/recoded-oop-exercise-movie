const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185'
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780'

class App {
  static run() {
    const page = new Page()
    let id= 534
    APIService.fetchMovie(id)
      .then(movie => page.renderMovie(movie))
    APIService.fetchActors(id)
      .then(actors=>page.renderActors(actors))  
  }
}

class APIService {
  static fetchMovie(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}`)
    return fetch(url)
      .then(res => res.json())
      .then(json => new Movie(json))
  }
    //
  static fetchActors(movieId){
      const acUrl=APIService._constructUrl(`movie/${movieId}/credits`)
      return fetch(acUrl)
        .then(res=>res.json())
        .then(json=>{
          let ArrOfActors=[]
          for(let i=0; i<4; i++){ArrOfActors.push(new Actors(json.cast[i]))}
          return ArrOfActors})
  }

  static  _constructUrl(path) {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`
  }
}

//
class Actors{
  constructor(json){
      this.name=json.name
      this.pic=json.profile_path
      //console.log(json.profile_path)
  }
}

class Page {
  constructor() {
    this.backdrop = document.getElementById('movie-backdrop')
    this.title = document.getElementById('movie-title')
    this.releaseDate = document.getElementById('movie-release-date')
    this.runtime = document.getElementById('movie-runtime')
    this.overview = document.getElementById('movie-overview')
    //
    this.actorList= document.getElementById('actors')
  }
  renderMovie(movie) {
    this.backdrop.src = BACKDROP_BASE_URL + movie.backdropPath
    this.title.innerText = movie.title
    this.releaseDate.innerText = movie.releaseDate
    this.runtime.innerText = movie.runtime + " minutes"
    this.overview.innerText = movie.overview
  }
  //
  renderActors(actors){
    for(let a of actors){
    //console.log(a)
    let actLi= document.createElement('li')
    let image = document.createElement('img')
    image.src=`${PROFILE_BASE_URL}/${a.pic}`
    console.log(image)
    actLi.appendChild(image)
    actLi.innerHTML+=`<br /> ${a.name}`
    actLi.className='col-md-3'
    this.actorList.appendChild(actLi)
  }
}
}

class Movie {
  constructor(json) {
    this.id = json.id
    this.title = json.title
    this.releaseDate = json.release_date
    this.runtime = json.runtime
    this.overview = json.overview
    this.backdropPath = json.backdrop_path
  }
}

document.addEventListener("DOMContentLoaded", App.run);
