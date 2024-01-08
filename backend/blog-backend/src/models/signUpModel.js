const connection = require('./connection')
const bcrypt = require('bcrypt')

const saltRounds = 10

const postCreds = async (data) => {
  try {
    const { email, password } = data
    console.log('email: ', email)
    console.log('userpassword: ', password)
    // Gere um salt aleatório
    const salt = await bcrypt.genSalt(saltRounds)

    // Crie um hash da senha com o salt
    const hashedPassword = await bcrypt.hash(password, salt)

    const query = 'INSERT INTO credentials (username, userpassword) VALUES ($1, $2) RETURNING *'
    const creds = await connection.query(query, [email, hashedPassword])

    console.log('Credentials inserted:', creds.rows)
    return creds.rows
  } catch (error) {
    console.error('Error entering credentials:', error)
    throw error // Lançar o erro para tratamento em um nível superior
  }
}

const postPerfil = async (data1, file) => {
  try {
    const { name, surname, email, dateofbirth } = data1
    const avatar = file
    console.log('Olha o avatar no model: ', file)
    const query1 = 'SELECT idcredentials FROM credentials WHERE username = $1'
    const creds = await connection.query(query1, [email])
    console.log('creds', creds.rows)
    const credentialId = creds.rows[0].idcredentials

    const query = 'INSERT INTO profile (name, surname, dateofbirth, avatar, credentialid) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const perfil = await connection.query(query, [name, surname, dateofbirth, avatar, credentialId])

    console.log('Profile inserted:', perfil.rows)
    return perfil.rows
  } catch (error) {
    console.error('Error entering profile:', error)
    throw error
  }
}

module.exports = {
  postPerfil,
  postCreds
}
