

const theatreId = 113;
const showing = document.querySelector('#showings')
let allShowings = [];


function showHTMLmaker(show){
  return `
  <div class="card">
    <div class="content">
      <div class="header">
        ${show.film.title}
      </div>
      <div class="meta">
        (Runtime) ${show.film.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">
          ${show.showtime}
        </span>
        ${show.capacity - show.tickets_sold} remaining tickets
      </div>
    </div>
    <div class="extra content">
      ${soldOut(show)}
    </div>
  </div>

  `
}

function soldOut(show){
  if (show.capacity - show.tickets_sold > 0){
    return `<div id="${show.id}" class="ui blue button">Buy Ticket</div>`
  } else {
    return `<div id="${show.id}" class="ui">Sold Out</div>`
  }
}

function showIteratorAndDisplayerInitial(shows){
  shows.forEach(function(show) {
    showing.innerHTML += showHTMLmaker(show)
    allShowings.push(show)}
  )
}

function showIteratorAndDisplayer(shows){
  showing.innerHTML = ''
  shows.forEach(function(show) {
    showing.innerHTML += showHTMLmaker(show)}
  )
}

function findShowingById(id){
  id = +id
  return allShowings.find(function(show){
    return show.id === id
  })
}

fetch('https://evening-plateau-54365.herokuapp.com/theatres/113')
.then(r => r.json())
.then(shows => showIteratorAndDisplayerInitial(shows.showings))

showing.addEventListener('click', () => {
  if(event.target.innerHTML === 'Buy Ticket'){
    let showId = +event.target.id
    let currentShow = findShowingById(showId)



    fetch(`https://evening-plateau-54365.herokuapp.com/tickets`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        showing_id: showId
      })
    })
    .then(r => r.json())
    .then(function(r) {console.log(r)
      currentShow.tickets_sold += 1
      showIteratorAndDisplayer(allShowings)
    })
    .catch(error => console.error({"error": "That showing is sold out"}))
    }
})
