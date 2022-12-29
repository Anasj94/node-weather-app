const request = require('request')


const geocode = (address,callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5hc2o5NCIsImEiOiJjbGMyaGp4aGExMnU1M3FwN2ZjNWEzaTNoIn0.85B5Y0x-r18iPDm284trIQ'

   request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to location services',undefined)
    }else if (body.features.length===0){
        callback('Unable to find location. Try another search',undefined)
    }else{
        callback(undefined,{
           longitude: body.features[0].center[1],
            latitude: body.features[0].center[0],
            //placeName: response.body.location.name
        })
    }
   })
}

module.exports = geocode