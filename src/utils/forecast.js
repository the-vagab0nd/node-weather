const request = require('request')

const forecast = (lattitude, longtitude, callBack) => {
    const weather_url = "http://api.weatherstack.com/current?access_key=ea3f1845dcefd8b4203f2618a614e575&query=" + lattitude + ',' + longtitude + "&units=f";
    request({
        url: weather_url
    }, (error, response) => {
        if (error) {
            callBack(error.code, undefined);
        } else {
            const data = JSON.parse(response.body)
            if (data.error) {
                callBack('Could not find the location', undefined)
            } else {
                callBack(undefined, "It is " + data.current.temperature + " but feels like " + data.current.feelslike);
            }
        }
    })
}

module.exports = forecast;