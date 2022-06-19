const request = require('postman-request')

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibnVuZHUiLCJhIjoiY2t6b201bWQ3MzNobzJvbjJkeHZpanB3ZiJ9.w-XD5AE5sYIIzda8Z9L9DA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {      callback('Unable to connect to locations services!', undefined);
    } else if (!body.features.length) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        latitude, longitude, location
      })
    }
  });
};

module.exports = geoCode;