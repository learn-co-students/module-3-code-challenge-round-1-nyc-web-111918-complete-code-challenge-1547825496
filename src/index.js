// spent most of my time trying to access the object. I kept getting udefined. I don't knwo if it was becuase of a bracket missing??`


const theatreId = 128;

document.addEventListener("DOMContentLoaded", () => {

  const cardShowings = document.querySelector('#card-showings')

  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(r => r.json())
    .then((showingsObj) => {
      showingsObj.showings.map((show) => {
        cardShowings.innerHTML = `<div class="card">
  <div class="content">
    <div class="header">
      ${show.film.title}
    </div>
    <div class="meta">
      ${show.film.runtime} minutes
    </div>
    ${show.film.showtime}
    <div class="description">
      <span class="ui label">
      </span>
      ${show.film.tickets_sold} remaining tickets
    </div>
  </div>
  <div class="extra content">

    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>`
      })

  })



})
