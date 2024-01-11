const connection = require('./connection')
const getAll = async () => {
  try {
    const tasks = await connection.query('SELECT * FROM credentials')
    return tasks.rows
  } catch (error) {
    console.error('Error inserting profile:', error)
    throw error
  }
}

module.exports = {
  getAll
}
