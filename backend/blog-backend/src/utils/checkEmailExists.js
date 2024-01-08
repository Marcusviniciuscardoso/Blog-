const connection = require('../models/connection')

const checkEmailExists = async (email) => {
  try {
    const query = 'SELECT * FROM credentials WHERE username = $1'
    const result = await connection.query(query, [email])

    return result.rows.length > 0
  } catch (error) {
    console.error('Error to validate email:', error)
    throw error // Lançar o erro para que possa ser tratado em um nível superior
  }
}

module.exports = {
  checkEmailExists
}
