const connection = require('./connection')

const postCards = async (data, file) => {
  try {
    const { title, subtitle, creationdate, profileid } = data
    const featuredimage = file
    const query = `
    INSERT INTO cards (title, subtitle, creationdate, profileid, featuredimage)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING idcard
    `
    const cards = await connection.query(query, [title, subtitle, creationdate, profileid, featuredimage])
    return cards.rows
  } catch (error) {
    console.error('Error to posting card:', error)
  }
}

const postCardsTexts = async (data, carditexts) => {
  try {
    const cardidtexts = carditexts
    const { text } = data
    const query = `
      INSERT INTO cardtexts (text, cardidtexts)
      VALUES ($1, $2) 
      RETURNING idcardtexts
    `
    const cards = await connection.query(query, [text, cardidtexts])
    return cards.rows
  } catch (error) {
    console.error('Error to posting card text:', error)
  }
}

module.exports = { postCards, postCardsTexts }
