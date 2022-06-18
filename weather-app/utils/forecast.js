const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8a6e005c7178cf38ca23707a87515637&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } =
        body.current;
      callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
    }
  });
};

module.exports = forecast;
