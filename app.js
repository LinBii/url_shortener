const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const generateShortURL = require('./shortenedURL')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
// if the same, the fetch data from database

// if not, generate new short url
app.post('/', (req, res) => {
  console.log('shortened URL is: ', generateShortURL(req.body))
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})