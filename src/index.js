const theatreId = 114;
//https://evening-plateau-54365.herokuapp.com/theatres/114
//https://evening-plateau-54365.herokuapp.com/tickets

document.addEventListener('DOMContentLoaded', ()=>{
  const showingsList = document.querySelector('#showing-list');
  let allShowings = [];
  //-------helpers
  function formatShowing(showing){
  return `
  <div class="card">
    <div class="content">
      <div class="header">
        ${showing.film.title}
      </div>
      <div class="meta">
        ${showing.film.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">${showing.showtime}</span>
        ${showing.capacity - showing.tickets_sold} remaining tickets
      </div>
    </div>
    <div class="extra content">
      <div data-ticket-id=${showing.id} class="ui blue button">Buy Ticket</div>
    </div>
  </div>
  `
  }//end of formatshowing

  function renderShowings(showings){
    showingsList.innerHTML = '';
    allShowings = showings;
    allShowings.forEach((showing)=> {
      return showingsList.innerHTML += formatShowing(showing);
    })//end for each
  }//end render showings

  function parseJSON(response){
    return response.json();
  }//end parseJSON

  function getFetch(){
    return fetch('https://evening-plateau-54365.herokuapp.com/theatres/114')
            .then(parseJSON)//parsed json for whole theatre
            .then((r)=>{
              const showings = r.showings
              //not doing this inside render function anymore because I just want to pass showings not a theatre to the helper so I can reuse for my update later with ticker repsonse.
              renderShowings(showings)
            }) //end of response rendering
  }//end of getFetch

  function postTicketFetch(showingId){
    return fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
      method: "POST",
      headers:
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({showing_id: showingId})
    })//end of actual ticket post fetch
  }//end of postTicketFetch function

  function ticketResponse(parsedResponse){
    //see if response has an id from created ticket if not do nothing
    if (parsedResponse.id){
      //find showing based on response
      const foundShowing = allShowings.find((showing)=>{
        return showing.id == parsedResponse.showing_id;
      })//end of find showing
        //find index before modifying the showing information
      const foundIndex = allShowings.indexOf(foundShowing)
      //increment tickets_sold and decrmeent available ticket count for that showing
      foundShowing.tickets_sold += 1;
      //update allShowings global array in DOM only (no patch to theatre to change showings)
      allShowings[foundIndex] = foundShowing;
      renderShowings(allShowings)
    }// end of if
  }//end of ticketResponse

  //---------------end of helpers
  //get fetch to theatre, parse promise json, render showings on page
  getFetch();

  //event listener on the showings list, listen for clicks to buy tickets button
  showingsList.addEventListener('click', (e) =>{
    // console.log(e.target.dataset.ticketId);
    //4 things to update
    //create a new ticket in api
    //and then patch the theatre to update that api
    //-->no patch needed, when a ticket is created it updates the theatres automatically
    //instead of using the get request to update my dom I am modifying my local array in the ticker promise response resolve, so it is still pessimistic and waiting for ticket repsonse even though I am not grabbing from the api again and just updated and re-rendering from my local allShowings array.
    //update allShowings array
    //update the dom

    if (e.target.dataset.ticketId){
      let foundShowing = allShowings.find((showing)=>{
        return showing.id == e.target.dataset.ticketId;
      })//end of found showing
      if (foundShowing.capacity == foundShowing.tickets_sold){
      alert(`Sorry, ${foundShowing.film.title} is sold out for ${foundShowing.showtime}!\nPlease select a different movie or showtime`)
      } else {
      // console.log(e.target);
      postTicketFetch(foundShowing.id)
      .then(parseJSON)
      .then(ticketResponse)
      alert(`Thank You!\nYou are seeing ${foundShowing.film.title} at ${foundShowing.showtime}\nRuntime is ${foundShowing.film.runtime} minutes`)
      // console.log(foundShowing.capacity);
      // console.log(foundShowing.tickets_sold);
    }//end of else
    }// end of data-ticket-id logic test
  })//end of showingslist event listener
})//end of dom content loaded
