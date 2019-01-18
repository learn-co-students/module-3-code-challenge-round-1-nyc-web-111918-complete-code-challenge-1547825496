
let theatres = []
const theatreId = 118;
const showings_table = document.querySelector('#showings')
let showings = []
const buyTicket = document.querySelector('#buy_ticket')

fetch('https://evening-plateau-54365.herokuapp.com/theatres/118')
.then(res=>(res.json())).then(parsedRes=>{
	showings = parsedRes.showings
	console.log(parsedRes)
	console.log(showings)
	
	showings.forEach((film)=>{showings_table.innerHTML += 
		`<div id=${film.id} class="card">
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
      <div id='${film.capacity - film.tickets_sold} remaining'>
      ${film.capacity - film.tickets_sold} remaining tickets
    </div>
  </div>
  

    <div data-id=${film.id} class="ui blue button">Buy Ticket</div>
  
</div>`
	})//the for each ending bracket
})//end of last then from fetch

showings_table.addEventListener('click', function(e){

	if (e.target.innerText == 'Buy Ticket'){
// console.log(showings.forEach(e=>(console.log(e.id))))
let target_film = showings.find(function(element)
	{return element.id == e.target.dataset.id})

//logic for soldout show would be here with some if statement....


let remaining = target_film.capacity - target_film.tickets_sold
let new_remaining = remaining - 1

console.log(remaining)
console.log(new_remaining)

let target_div = document.getElementById(`${target_film.id}`)
console.log(target_div)

target_div.innerHTML = 

`<div id=${target_film.id} class="card">
  <div class="content">
    <div class="header">
      ${target_film.film.title}
    </div>
    <div class="meta">
      ${target_film.film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${target_film.showtime}
      </span>
      <div id='${new_remaining} remaining'>
      ${new_remaining} remaining tickets
    </div>
  </div>
  
    <div data-id=${target_film.id} class="ui blue button">Buy Ticket</div>
  
</div>`

fetch ('https://evening-plateau-54365.herokuapp.com/theatres/118',  {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          "showings": {
          	"tickets_sold" : `${target_film.tickets_sold +1}`
          }
        })
      }).then(res => console.log(res))


//failed to patch and I am not sure why...


}//end of if statement 




})//end of showings table listening 

