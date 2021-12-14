const express = require('express')
const router = express.Router()
// 引用url model
const URL = require('../../models/url')
const generateShortURL = require('../../shortenedURL')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params
  return URL.findOne(shortURL)
    .then(data => res.redirect(data.originalURL))
    .catch(error => console.log(error))
})

// submit
router.post('/', (req, res) => {
  const originalURL = req.body.url
  const shortURL = generateShortURL(5)
  // check if it is the same url
  URL.findOne({ originalURL })
    .then(data => {
      // 輸入相同網址時，產生一樣的縮址
      if (data) {
        return data
      } else {
        return URL.create({ originalURL, shortURL })
      }
    })
    .then(data =>
      res.render('index', {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(error => console.log(error))
})

module.exports = router