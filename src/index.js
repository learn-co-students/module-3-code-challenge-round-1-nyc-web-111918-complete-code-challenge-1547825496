const theatreId = 126;
// API LINK https://evening-plateau-54365.herokuapp.com/theatres/126
// need a list of all moives from API
// get the container you needed
// helper render method.
// fetch and render that badboy to the page
// Buy ticket should purchase a ticket and decrement the tickets one by one.
// need tp update the API with a PATCH request!!
// Ticket is sold out user should not be able to but that ticket.
//if statment to make it so the button cannot be clicked or a message alert.
console.log('hello')
document.addEventListener('DOMContentLoaded', function(event) {
console.log('page loaded')
  // select the id of showings-container
  const showingContainer = document.querySelector('#showing-container');


  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(res => res.json())
  .then(jsonObj => {
    // the object has the array we need in the showins key.
    //film is another object that has the title.
    const showingsArray = jsonObj.showings
    console.log(showingsArray)
    // const arrayOfFilms = showingsArray.map(function(showingfilm){
    //   return showing.film
    // });
    // console.log(arrayOfFilms, showingsArray)
    const mappedShowingArr = showingsArray.map((showing) => {
      return renderShowingsContainer(showing)
    }).join('')
    // console.log(mappedShowingArr)
    showingContainer.innerHTML += mappedShowingArr
  })// end of then statment.

// Click Buy Ticket
// need a click eventListener on the wholes showing Container
showingContainer.addEventListener('click', e => {
const buyButton = document.querySelector('#buy-button')
const card = document.querySelector('.card')
const targetButtonId = document.querySelector(`[data-button-id="${e.target.dataset.buttonId}"]`)
const remaingTickets = document.querySelector(`[data-ticket-id="${e.target.dataset.ticketId}"]`)
// console.log(e.target, 'you clicked!')
// console.log(e.target.dataset.id)
// if you click on the buybutton
// console.log(targetButtonId,remaingTickets );
if(e.target === buyButton) {
  //decrease the remaing ticket number by one
  //once the remaing ticket number gets to 0.
  // make the replace the HTML of the buy button to SOLD OUT.
  // take the
  // card.innerHTML =
}
// POST
// send a fetch request to the server
// use the Json data to subtract the current tickets sold from the capactiy.
//jsonObj.showings.



})// end of showigs container eventListener







/***********************HELPER RENDER FUNCTIONS***************************/
function renderShowingsContainer(showingsArray) {
  // the return need to be on the same line as the code you want to return
  // asshole!
  return `
    <div class="card" data-card-id="${showingsArray.id}">
      <div class="content">
        <div class="header">
          Film titles
        </div>
        <div class="meta">
        Film runtime minutes
        </div>
        <div class="description">
          <span class="ui label">
            ${showingsArray.showtime}
          </span>
          <div id="tickets-sold" data-ticket-id="${showingsArray.id}">
          ${showingsArray.tickets_sold} remaining tickets
          </div>
        </div>
      </div>
      <div class="extra content">
        <div class="ui blue button" id="buy-button" data-button-id="${showingsArray.id}" >Buy Ticket</div>
      </div>
    </div>
  `
}




}); // end of DOMContentLoaded listener
