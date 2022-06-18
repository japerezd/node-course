const path = require('path')
const express = require('express');
const hbs = require('hbs')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'JP'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'JP'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is a help message',
    name: 'JP',
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Partially cloud',
    location: 'Veracruz'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    name: 'Jorge Pérez',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    name: 'Jorge Pérez',
    title: '404'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
