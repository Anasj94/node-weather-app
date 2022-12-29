const request = require('request')

const forecast = (longitude,latitude,callback) => {

    const url= 'http://api.weatherapi.com/v1/current.json?key=6c11536d1e4546bba3b212723222412&q='+ longitude +','+latitude+ '&i=naqo'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else{
            callback(undefined,{
               temp:body.current.temp_c,
               region: body.location.region,
               city:body.location.name,
               condition: body.current.condition.text
            })
        }
       })
    }

module.exports = forecast