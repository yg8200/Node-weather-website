
console.log('Client side java script is loaded')

const wearherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_One = document.querySelector('#meesage-1')
const message_Two = document.querySelector('#meesage-2')
const message_Three = document.querySelector('#message-3')

wearherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message_One.textContent = 'Loading'
    message_Two.textContent = ''
    message_Three.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message_One.textContent = 'error - something went wrong, search again'
          }
          else {
          message_One.textContent = 'The tempeture is currently: ' + data.temperature 
          message_Two.textContent = 'Place name: ' + data.place_name
          message_Three.textContent = data.place_name + ' time right now is: ' + data.localTime
          }
        
    })
})

})