const connection = require('./connection')

const getCards = async () => {
  try {
    const cards = await connection.query(`
    SELECT *
    FROM cards
    inner join cardtexts ON cards.idcard = cardidtexts
    `)
    return cards.rows
  } catch (error) {
    console.error('Error to selecting cards: ', error)
  }
}

module.exports = { getCards }
