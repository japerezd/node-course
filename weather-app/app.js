const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
  console.log('Please give a correct location');
} else {
  // Geocoding
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log('Error in location', error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log('Error in forecast', error);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
}
