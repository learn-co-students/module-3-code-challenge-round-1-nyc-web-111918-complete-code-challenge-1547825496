const theatreId = 116;
document.addEventListener('DOMContentLoaded', function(){
  ALLMOVIES = []
  ALLSHOWINGS = []
  const bodyCards = document.querySelector('#showingMovies');


  //****************************************** DISPLAY ALL
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/116`)
  .then(r => r.json())
  .then(movies =>{
    ALLSHOWINGS = movies.showings
    movies.showings.forEach(function(movie){
      displaySingleCard(movie)
    })
  })
console.log("showing", ALLSHOWINGS);
//**************************************** HELPERS
  function displaySingleCard(film){
    let card = `<div class="card" >
      <div class="content">
        <div class="header">
          ${film.film.title}
        </div>
        <div class="meta">
          ${film.film.runtime} minutes
        </div>
        <div class="description">
          <span class="ui label">
            ${film.showtime}
          </span>
          <p data-Cust="${film.id}">${film.capacity - film.tickets_sold} remaining tickets</p>
        </div>
      </div>
      <div class="extra content">
        <div class="ui blue button" data-id="${film.id}" data-action="buyTicket">Buy Ticket</div>
      </div>
    </div>`

    bodyCards.innerHTML += card
  }


//********************************************* BUY A TICKET LISTENER
bodyCards.addEventListener('click', (e)=>{
  console.log("in the listener");

  if(e.target.dataset.action === "buyTicket"){
    ALLSHOWINGS.forEach(function(movie){
      if (movie.id == e.target.dataset.id){
        return movie.tickets_sold -= 1;
      }
    })

  console.log(e.target.dataset.id);
  let ID = e.target.dataset.id

    fetch(`https://evening-plateau-54365.herokuapp.com/tickets`,{
      method: "POST",
				headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
				body: JSON.stringify({
          showing_id: ID
      })
    })
    .then(r => r.json())
    .then((film) => {
      let remainNum = document.querySelector(`[data-Cust=${film.id}]`)
      remainNum.innerText = `${film.capacity - film.tickets_sold} remaining tickets`
    })
  }
})
})



// editForm.addEventListener("submit", function(e){
// 				e.preventDefault()
// 				fetch(`http://localhost:3000/pokemon/${pokemonData.id}`,{
// 						method: "PATCH",
// 						headers: {
// 							"Content-Type" : "application/json",
// 							"Accept" : "application/json"
// 						},
// 						body: JSON.stringify({
// 							name: nameEditinput.value,
// 							sprites: {
// 								front: frontEditinput.value,
// 								back: backEditinput.value
// 							}
// 						})
// 				}).then( r => r.json())
// 				.then((updatedPokemon) => {
// 						console.log(updatedPokemon, "updatedPokemon")
// 						// which one im going to edit by the index
// 						const pokemonOriginalIndex = allPokemon.indexOf(pokemonData)
// 						allPokemon[pokemonOriginalIndex] = updatedPokemon
// 						// update the DOM
// 						showAllPokemon(allPokemon)
// 						// replace the one to edit with the NEW pokemon
// 						// re render
// 				})
// 			})


// { method: "PATCH", headers: { "Content-Type" : "application/json", "Accept" : "application/json" }, body: JSON.stringify({ name: nameEditinput.value, sprites: { front: frontEditinput.value, back: backEditinput.value } }) }).then( r => r.json()) .then((updatedPokemon) => { console.log(updatedPokemon, "updatedPokemon") // which one im going to edit by the index const pokemonOriginalIndex = allPokemon.indexOf(pokemonData) allPokemon[pokemonOriginalIndex] = updatedPokemon // update the DOM showAllPokemon(allPokemon)

// console.log(bodyCards);
// console.log("sometext");
//
// let film = {
// "id": 1123,
// "film": {
// "title": "Nine Coaches Waiting 3",
// "runtime": 93
// },
// "capacity": 20,
// "showtime": "12:49PM",
// "tickets_sold": 7
// }
