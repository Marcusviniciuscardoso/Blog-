const express = require('express')
const profileInfoRouter = express.Router()
const profileInfoController = require('../controllers/profileInfoController')
const { v4: uuidv4 } = require('uuid')

const validationBody = (req, res, next) => {
  try {
    const { body } = req
    const requiredFields = ['name', 'surname', 'dateofbirth']

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === '') {
        return res.status(400).json({ message: `${field} undefined` })
      }
    }
    next()
  } catch (error) {
    console.error('Error to validate information fields of profile:', error)
    res.status(500).json({ message: 'Server internal error' })
  }
}

profileInfoRouter.get('/profileInfo/:id', profileInfoController.getProfileInfo)
profileInfoRouter.put('/profileInfo', validationBody, async (req, res, next) => {
  try {
    console.log('** Received data: **', req.body)

    if (!req.files || !req.files.avatar || req.files.avatar === null) {
      req.body.avatar = null
      console.log('O avatar é null')
      next()
      // return res.status(400).json({ message: 'No file uploaded' });
    } else {
      const img = req.files.avatar
      const ext = img.mimetype.split('/')[1]
      const nome = `${uuidv4()}.${ext}`

      img.mv(`public/images/uploads/${nome}`, async (err) => {
        if (err) {
          console.error('Error saving file:', err)
          return res.status(500).json({ message: 'Error saving file' })
        }

        req.files.avatar = nome
        console.log('Salvou o nome da image: ', nome)
        next()
      })
    }
  } catch (error) {
    console.error('Error processing profileInfo:', error)
    res.status(500).json({ message: 'Server internal error' })
  }
}, profileInfoController.updateProfileInfo)

module.exports = profileInfoRouter
