const theatreId = 120;
URL = `https://evening-plateau-54365.herokuapp.com/theatres/120`
ALLMOVIES = []

document.addEventListener('DOMContentLoaded', () => {

  const movieContainer = document.querySelector(".ui.cards.showings")

  fetch(URL)
  .then(r => r.json())
  .then(moviesObj => {
    ALLMOVIES = moviesObj.showings
    movieContainer.innerHTML = renderAllMovies()
  })

  movieContainer.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('button')) {
      foundMovie = ALLMOVIES.find((movie) => {return movie.id == e.target.dataset.id})
      if (foundMovie.tickets_sold < foundMovie.capacity) {
        foundMovie.tickets_sold++
        // fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Action: "application/json"
        //   },
        //   body: JSON.stringify({
        //     "id": foundMovie.id,
        //     "film": {
        //       "title": foundMovie.film.title,
        //       "runtime": foundMovie.film.runtime
        //     },
        //     "capacity": foundMovie.capacity,
        //     "showtime": foundMovie.showtime,
        //     "tickets_sold": foundMovie.tickets_sold,
        //     "showing_id": theatreId
        //   })
        // })
        // .then(r => r.json())
        // .then(showingObj => {
        //   // posting to server in the then so it  pessismistically renders the ticket counter
        //   console.log(showingObj)
          movieContainer.innerHTML = renderAllMovies()
        // })
      } else {
        console.log("error That showing is sold out")
      }
    }
  })//End of Listener { "id": 3820, "showing_id": 182, "created_at": "2017-11-13T12:12:28.682Z" }

}) //End of DOMContentLoaded

const renderAllMovies = () => {
  return ALLMOVIES.map((movie) => movieHTML(movie)).join('')
}

const movieHTML = (movie) => {
  return `
  <div class="card">
    <div class="content">
      <div class="header">
        ${movie.film.title}
      </div>
      <div class="meta">
        ${movie.film.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">
          ${movie.showtime}
        </span>
        ${movie.capacity - movie.tickets_sold} remaining tickets
      </div>
    </div>
    <div class="extra content">
      <div data-id="${movie.id}" class="ui blue button">Buy Ticket</div>
    </div>
  </div>
  `
}
