const theatreId = 123;
const theatreURL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
const ticketURL = "https://evening-plateau-54365.herokuapp.com/tickets"
const movieContainer = document.querySelector('.ui.cards.showings')
let allShowings = []
// console.log(movieContainer);
fetch(theatreURL)
.then(res => res.json())
.then(data => {
  // console.log(data)
  allShowings = data.showings
  data.showings.forEach((showing) => {
    movieContainer.innerHTML += renderShowing(showing)
  })
})
function renderShowing(showing) {
  let numOfTickets = showing.capacity - showing.tickets_sold
  return `
  <div class="card">
    <div class="content" id=${showing.id}>
      <div class="header">${showing.film.title}</div>
      <div class="meta">"${showing.film.runtime} minutes"</div>
      <div class="description">
        <span class="ui label">${showing.showtime}</span>
      ${numOfTickets} remaining tickets
      </div>
    </div>
  <div class="extra content">
    <div class="ui blue button" data-id='${showing.id}'>Buy Ticket</div>
  </div>
</div>
`
}

movieContainer.addEventListener('click', (e) => {
  // console.log(e.target);
  if (e.target.className == 'ui blue button') {
    const foundContent = e.target.parentNode.parentNode.querySelector('.content')
    // console.log(foundContent);
    // console.log(e.target);
    const foundDescription = foundContent.querySelector('.description')
    console.log(foundDescription.innerHTML);
    const foundShowing = allShowings.find(showing => showing.id == e.target.dataset.id)
    const foundId = foundShowing.id
    // console.log(foundShowing)
    let numOfTickets = foundShowing.capacity - foundShowing.tickets_sold
    const headers = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        showing_id: foundId
      })
      }
      fetch(ticketURL, headers)
      .then(res => res.json())
      .then(data => {
      // console.log(data);
      foundDescription.innerHTML = `
      <span class="ui label">${foundShowing.showtime}</span>
      ${numOfTickets} remaining tickets
      `
    })

    }

})
