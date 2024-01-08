const connection = require('./connection')

const getCards = async () => {
  const query = 'SELECT * FROM cards'
  const cards = await connection.query(query)
  return cards.rows
}

module.exports = {
  getCards
}
