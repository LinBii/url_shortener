function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateShortURL() {
  const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  let shortenedURL = ''
  for (let i = 0; i < 5; i++) {
    shortenedURL += sample(BASE62)
  }

  return shortenedURL
}

module.exports = generateShortURL()