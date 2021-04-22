const request = require('request')

const geocode = (address, callback) => {
    const location_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFnYWIwbmQiLCJhIjoiY2tucHU0ZGt5MGN1ejJvbm9zNDR2eHlxYSJ9.urGdfFlNqm-2OfSdbJUi0A&limit=2'
    request({
        url: location_url
    }, (error, response) => {
        if (error) {
            callback('Error', undefined);
        } else {
            const data = JSON.parse(response.body)
            if (data.features.length === 0) {
                callback('Dimkat', undefined);
            } else {
                response = {
                    data: data.features[0].center,
                    place_name: data.features[0].place_name
                };
                callback(undefined, response);
            }
        }
    })
}

module.exports = geocode