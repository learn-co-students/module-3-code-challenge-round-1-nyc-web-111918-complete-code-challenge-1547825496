document.addEventListener("DOMContentLoaded",()=>{
  console.log('dom loaded')
  const movieShowings = document.querySelector("#movie-showings")
  let allShowings = {}

  fetch("https://evening-plateau-54365.herokuapp.com/theatres/127")
  .then(r => r.json())
  .then((data)=>{
    // console.log(data.name)
    // console.dir(data.showings)//ARRAY
    allShowings = data
    //debugger
    let obj = data.showings
    for (let val in obj){
      movieShowings.innerHTML += `
        <div data-id="${obj[val].id}"class="card">
      <div class="content">
        <div class="header">
          ${obj[val].film.title}
        </div>
        <div class="meta">
          ${obj[val].film.runtime}minutes
        </div>
        <div class="description">
          <span class="ui label">
            ${obj[val].showtime}
          </span>
          ${obj[val].capacity - obj[val].tickets_sold}remaining tickets
          </div>
        </div>
        <div class="extra content">
          <div data-action="buy"data-id="${obj[val].id}"class="ui blue button">Buy Ticket</div>
        </div>
      </div>`
    }
    //debugger
    //console.dir(data)//OBJECT
  })
  //
  movieShowings.addEventListener("click",(e)=>{
    //console.log(e.target.dataset.action,'clicking e')
    if (e.target.dataset.action === "buy"){
      //console.log('clicking buy')
      //console.log(allShowings)
      let obj = allShowings.showings
      //Object.keys(obj).map(key => console.dir(key.id))
      //debugger
      let showId = parseInt(e.target.dataset.id)
      obj.filter(show => show.id === showId)

      //console.log(id)
      debugger
      // obj.find(show=>{
      //   return show.id === e.target.dataset.id
      // })
      // let id = []
      // for (let val in obj){
      //   id.push(obj[val].id)
      //   break
      //   console.dir(id)
      // }
      // console.dir(id)

      //let tickets = ""
      // for (let val in obj){
      //   tickets = obj[val].capacity - obj[val].tickets_sold
      //   //console.log(tickets)
      // }
      // Object.keys(obj).forEach((key)=>console.log(key,obj[key].id))
      // debugger
      // let id = ""
      // for(v of Object.values(obj)){id = v.id}
      //console.log(allShowings.id)
      //debugger
      //console.log(tickets)
    // fetch("https://evening-plateau-54365.herokuapp.com/tickets",{
    //   method:"POST",
    //   headers:{
    //     'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     showing_id: id
    //   })
    // }).then(r => r.json())
    // .the((data)=>{
    //   console.log(data)
    // })
  }

  })

















})// end of EVENT LISTENER
const theatreId = 127;
