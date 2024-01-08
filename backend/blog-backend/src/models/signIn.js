const connection = require('./connection')

const postCreds = async (data) => {
  try {
    const { username, userpassword } = data
    const newPost = await connection.query('INSERT INTO credentials (username, userpassword) VALUES ($1, $2) RETURNING *', [username, userpassword])
    return newPost.rows
  } catch (error) {
    console.error('Error after inserting credentials: ', error)
  }
}

const getCredsProfile = async (idcredentials) => {
  try {
    const query = `
        SELECT idprofile
        FROM profile
        INNER JOIN credentials ON profile.credentialid = credentials.idcredentials
        WHERE credentials.idcredentials = $1`
    const id = await connection.query(query, [idcredentials])
    return id.rows
  } catch (error) {
    console.error('It was not possible to retrieve id from profile', error)
  }
}

module.exports = {
  postCreds,
  getCredsProfile
}
