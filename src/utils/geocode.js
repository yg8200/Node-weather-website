const request = require('postman-request')

const geoCode = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieXV2YWwzMTIiLCJhIjoiY2tjZXFmd3ZwMGF2bjJ0bnhscm5lZ2ZiYSJ9.rUND_oUww7aveD0umKLqwA&limit=1'
    request({url: url , json: true} , (error , {body}) =>{
         if(error){
             callback('unable to connect to location service' , {location, latitude, longitude} = {})
         } else if(body.features.length === 0){
             callback('unable to find location. try another search', {location, latitude, longitude} = {})
         } else{
             callback(undefined , {
                 latitude:  body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 longitude:  body.features[0].place_name
             })
         }

    })
}


module.exports = {
    geoCode : geoCode 
}