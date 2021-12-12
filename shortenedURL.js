function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = function generateShortURL(URLLength) {
  const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  let shortenedURL = ''
  for (let i = 0; i < URLLength; i++) {
    shortenedURL += sample(BASE62)
  }

  return shortenedURL
}