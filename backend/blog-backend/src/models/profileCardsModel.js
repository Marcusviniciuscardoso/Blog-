const connection = require('./connection')

const getProfileCards = async (id) => {
  try {
    const query = `
      SELECT cards.*
      FROM cards
      INNER JOIN profile ON cards.profileid = profile.idprofile
      WHERE profile.idprofile = $1;
    `
    const profileCards = await connection.query(query, [id])
    return profileCards.rows
  } catch (error) {
    console.error('Error after selecting cards from profile: ', error)
  }
}

const deleteProfileCards = async (id, cardId) => {
  try {
    console.log('id: ', id)
    const query = `
        DELETE FROM cards
        WHERE profileid = $1 AND idcard = $2
      `
    const profileCards = await connection.query(query, [id, cardId])
    return profileCards.rows
  } catch (error) {
    console.error('Error to deleting cards from profile: ', error)
  }
}

module.exports = { getProfileCards, deleteProfileCards }
