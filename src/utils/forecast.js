const request = require('postman-request')

const forecast = (latitude , longitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=984c0ad59361fe682c55e91f8a070481&query='+ latitude + ',' + longitude + '&units=m'
    request({url: url , json: true} , (error , {body}) =>{
        if(error){
            callback('Unable to connect to weather service!' , undefined)
        } else if(body.error) {
            callback('unable to find a location , try another search' , undefined)
        } else {
            callback(undefined , {
                place_name: body.location.country,
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}
module.exports = {
    forecast: forecast
}