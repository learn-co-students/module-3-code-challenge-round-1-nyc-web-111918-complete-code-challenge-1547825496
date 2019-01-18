const theatreId = 109;
const THEATERAPI = "https://evening-plateau-54365.herokuapp.com/theatres/109"
let allShowings = []
let filmToPurchasObj

document.addEventListener("DOMContentLoaded", () => {

  const showingsContainer = document.querySelector("#showings-container")

  function renderAllShowings() {
    fetch(THEATERAPI)
    .then( res => res.json())
    .then( showings => {
      allShowings = showings.showings
      console.log(showings.showings);
      mappedShowings(allShowings)
    })
  }
  renderAllShowings()

  function mappedShowings(showingsArr) {
    showingsArr.map( showing => {
      renderShowingCard(showing)
    })
  }

  function renderShowingCard(showing) {
    showingsContainer.innerHTML += `<div class="card">
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
          ${showing.capacity - showing.tickets_sold} remaining tickets
        </div>
      </div>
      <div class="extra content">
        <div data-id=${showing.id} data-action="buy" class="ui blue button">Buy Ticket</div>
      </div>
    </div>
    `
  }



  // Purchase Ticket
  showingsContainer.addEventListener("click", e => {
    e.preventDefault()
    if (e.target.dataset.action == "buy") {
      filmToPurchaseObj = allShowings.find( film => film.id == e.target.dataset.id)
      // console.log(filmToPurchaseObj);
      let tickets_left = 20 - filmToPurchaseObj.tickets_sold
      const filmCard = e.target.parentNode.parentNode
      const descriptionContainer = filmCard.querySelector(".description")
      //Creat New Ticket Obj
      if (filmToPurchaseObj.tickets_sold < filmToPurchaseObj.capacity) {
        // console.log(filmToPurchaseObj.capacity);
        fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "showing_id": filmToPurchaseObj.id,
            // "tickets_sold": filmToPurchaseObj.tickets_sold + 1
          })
        })
        .then( res => res.json())
        .then( ticketsSold => {
          // console.log(ticketsSold);
          descriptionContainer.innerHTML = `
            <div class="description">
              <span class="ui label">
              ${filmToPurchaseObj.showtime}
              </span>
              ${tickets_left - 1} remaining tickets
            </div>`
        })
        // descriptionContainer.innerHTML = `
        //   <div class="description">
        //     <span class="ui label">
        //     ${filmToPurchaseObj.showtime}
        //     </span>
        //     ${tickets_left - 1} remaining tickets
        //   </div>`
      } else {
        window.alert("That showing is sold out")
      }
    }


  })//end of listener


})//end of DOMContentLoaded
