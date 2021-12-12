const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const URL = require('./models/url')
const generateShortURL = require('./shortenedURL')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

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

// submit
// check if it is the same url 
// if the same, then fetch data from database

// if not, generate new short url
app.post('/', (req, res) => {
  const originalURL = req.body.url
  const shortURL = generateShortURL(req.body)
  return URL.create({ originalURL, shortURL })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})