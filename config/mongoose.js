const mongoose = require('mongoose')

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

module.exports = db