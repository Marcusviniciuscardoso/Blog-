const signIn = require('../models/signIn')

const postCreds = async (request, response) => {
  await signIn.postCreds(request.body)
  // return response.status(201).json(creds)
}

const getCredsProfile = async (request, response) => {
  const idCredentials = request.user.idcredentials
  console.log(request.user)
  console.log('tá passando aqui ?')
  const idProfile = await signIn.getCredsProfile(idCredentials)
  return response.json({ credentials: idCredentials, data: 'Informações confidenciais', idprofile: idProfile })
}

module.exports = {
  postCreds,
  getCredsProfile
}
