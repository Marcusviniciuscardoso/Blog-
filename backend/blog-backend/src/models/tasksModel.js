const connection = require('./connection')
const getAll = async () => {
  try {
    const tasks = await connection.query('SELECT * FROM credentials')
    return tasks.rows
  } catch (error) {
    console.error('Erro ao inserir perfil:', error)
    throw error
  }
}

module.exports = {
  getAll
}
