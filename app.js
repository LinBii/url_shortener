const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const URL = require('./models/url')
const generateShortURL = require('./shortenedURL')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/url-shortener')
// get database connection
const db = mongoose.connection
// if error
db.on('error', () => {
  console.log('mongodb error!')
})
// if success
db.once('open', () => {
  console.log('mongodb connected!')
})

const port = 3000

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:shortURL', (req, res) => {
  const shortURL = req.params
  return URL.findOne(shortURL)
    .then(data => res.redirect(data.originalURL))
    .catch(error => console.log(error))
})

// submit
// check if it is the same url 
// if the same, then fetch data from database

// if not, generate new short url
app.post('/', (req, res) => {
  const originalURL = req.body.url
  const shortURL = generateShortURL(5)
  return URL.create({ originalURL, shortURL })
    .then(data => {
      res.render('index', {
        origin: req.headers.origin,
        shortURL: data.shortURL
      })
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})