const request = require('request');

const forecast = (address,callback) => { 
    const url = 'http://api.weatherapi.com/v1/current.json?key=d1689363f0fc43f388691242201108&q='+address;
    request({url:url, json:true},(error,{body})=>{
        if(error){
        callback("Unable to connect to the weather service",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else {
            const current = body.current
            callback(undefined,{
                forecast: current.condition.text,
                country: body.location.country})
        }
    })
}

module.exports = {
    forecast: forecast
}