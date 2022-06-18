const http = require('http');

const url = `http://api.weatherstack.com/current?access_key=8a6e005c7178cf38ca23707a87515637&query=45,-75&units=f`;

const request = http.request(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk.toString();
  });

  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', error => {
  console.log('An error', error);
})

request.end();
