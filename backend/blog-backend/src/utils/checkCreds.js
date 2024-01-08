const connection = require('../models/connection')
const bcrypt = require('bcrypt')

const checkCreds = async (email, senha) => {
  try {
    const query = `
      SELECT idcredentials, username, userpassword
      FROM credentials 
      WHERE username = $1`
    const result = await connection.query(query, [email])
    console.log('resultado: ', result.rows)
    if (result.rows.length === 0) {
      return false
    }

    const userPasswordHash = result.rows[0].userpassword
    const passwordMatch = await bcrypt.compare(senha, userPasswordHash)
    if (passwordMatch) {
      return result
    } else {
      return false
    }
  } catch (error) {
    console.error('Error to check credentials:', error)
    throw error
  }
}

module.exports = {
  checkCreds
}
