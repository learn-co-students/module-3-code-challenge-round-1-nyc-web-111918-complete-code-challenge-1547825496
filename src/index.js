const theatreId = 122;
const showings = document.querySelector('.showings');
const URL = 'https://evening-plateau-54365.herokuapp.com/theatres/122';

/*
  when the page loads I should see a list of movie showings
  fetched from a remote API.
 */
function fetchItems()  {
return fetch(URL) // Default to get
	.then(parseJSON) //parse response for json
	.then(theater => showings.innerHTML = renderAllMovies(theater)) //<== the object containing the data (Array of objects)
}
fetchItems();
/*
  clicking on the 'Buy Ticket' button should purchase a
  ticket and decrement the remaining tickets by one.
  This information should be persisted in the remote API.
*/
// first add event listener for the ticket card container -- @showings
showings.addEventListener('click', (e) => {
	if (e.target.dataset.action === 'buyTicket') {
		let showing_id = parseInt(e.target.dataset.ticketId)
    console.log(showing_id)
		//make this a function
		fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}, // CHECK YOUR VARIABLES
				body: JSON.stringify({
					showing_id,
					tickets_sold: currentTicketAmtSold++
				})
			}) // Default to get
			.then(parseJSON) //parse response for json
			.then((data) => {
				if(data.error) {

					alert(data.error)
				}
			})
			.then(fetchItems())
			// possible optomistic diff to tell user the movie is soldout
			//let el = document.querySelector(`#soldout-${showing_id}`);
			// console.log(el)
		}
});

//
let currentShowingCapacity,
    currentTicketAmtSold;
function renderAllMovies(theater) {

	return theater.showings.map((showing) => {
    currentShowingCapacity = showing.capacity;
    currentTicketAmtSold = showing.tickets_sold;
    return (`<div class="card">
      <div class="content">
        <div class="header">
          ${showing.film.title}
        </div>
        <div class="meta">
          ${showing.film.runtime} minutes
        </div>
        <div class="description">
          <span class="ui label">
            ${showing.showtime}
          </span>
          <span class="ui label">
            ${showing.capacity-showing.tickets_sold} remaining tickets
          </span>
        </div>
      </div>
      <div  id='soldout-${showing.id}' class="extra content">
        <div data-action="buyTicket" data-ticket-id=${showing.id} class="ui blue button">Buy Ticket</div>
      </div>
    </div>`)
  }).join('')
}

function parseJSON(res) {
	return res.json()
}
