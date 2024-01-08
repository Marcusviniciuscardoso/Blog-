const connection = require('./connection')

const getProfileInfo = async (idcredentials) => {
  try {
    const idProfileNumber = parseInt(idcredentials, 10) // Convertendo para número
    console.log('olha o id de getprofileinfo: ', idProfileNumber)

    const profile = await connection.query('SELECT * FROM profile WHERE profile.idprofile = $1', [idProfileNumber])
    return profile.rows
  } catch (error) {
    console.error('Error after selecting information from profile: ', error)
  }
}

const updateProfileInfo = async (data, files) => {
  try {
    const avatar = files
    console.log('avatar profile controller: ', avatar)
    const { idprofile, name, surname, dateofbirth } = data

    const idProfileNumber = parseInt(idprofile, 10) // Convertendo para número
    let query = `
       UPDATE profile 
       SET 
       name = $2,
       surname = $3, 
       dateofbirth = $4
       `

    const values = [idProfileNumber, name, surname, dateofbirth]

    if (avatar) {
      query += `
       ,avatar = $5`
      values.push(avatar)
      query += `
         WHERE idprofile = $1`
    } else {
      query += `
         WHERE idprofile = $1`
    }
    console.log('Olha o query: ', query)

    const profile = await connection.query(query, values)

    console.log('Rows de profileInfo no update: ', profile.rows)
    return profile.rows
  } catch (error) {
    console.error('Error after updating information from profile: ', error)
  }
}

module.exports = { getProfileInfo, updateProfileInfo }
