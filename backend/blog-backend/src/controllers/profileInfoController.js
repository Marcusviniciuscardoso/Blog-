const profileInfoModel = require('../models/profileInfoModel')

const getProfileInfo = async (req, res) => {
  console.log('vaaaai 1: ', req.params.id)
  const profileInfo = await profileInfoModel.getProfileInfo(req.params.id)
  return res.status(200).json(profileInfo)
}

const updateProfileInfo = async (req, res) => {
  if (!req.files) {
    const profileInfo = await profileInfoModel.updateProfileInfo(req.body, 0)
    return res.status(201).json(profileInfo)
  } else {
    console.log('Passou aqui em profileInfo update: ')
    const profileInfo = await profileInfoModel.updateProfileInfo(req.body, req.files.avatar)
    return res.status(201).json(profileInfo)
  }
}

module.exports = { getProfileInfo, updateProfileInfo }
