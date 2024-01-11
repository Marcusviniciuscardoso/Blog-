const signUpModel = require('../models/signUpModel')
const emailUtils = require('../utils/checkEmailExists')

const combinedController = async (req, res) => {
  try {
    const checkEmailExists = await emailUtils.checkEmailExists(req.body.username)

    if (checkEmailExists) {
      return res.status(400).json({ message: 'E-mail already registered' })
    }
    if (!req.files) {
      return res.status(400).json({ message: 'No files' })
    }
    await signUpModel.postCreds(req.body)
    const profile = await signUpModel.postProfile(req.body, req.files.avatar)

    if (profile && profile.length > 0) {
      res.status(200).json(profile)
    } else {
      res.status(400).json({ message: 'Failed to create profile' })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  combinedController
}
