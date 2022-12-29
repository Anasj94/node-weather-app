// Here we are developing the code for fetching the data from
// the API so that we can use it anywhere in the website.


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') // # for the ID, and . for the Class
const messageTwo = document.querySelector('#message-2') // # for the ID, and . for the Class


weatherForm.addEventListener('submit',(e) => { 
    e.preventDefault() // it does not refresh the page
    
    const location = search.value

        
    messageOne.textContent='Loading....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
              if(data.error){
            messageOne.textContent=data.error
        } else {
            messageOne.textContent= 'Location : '+ data.region + ', '+ data.city
            messageTwo.textContent = 'Temperature : ' + data.temp + 'C ' + ' ( '+ data.condition+ ' )'
        }
        
    })



})

})