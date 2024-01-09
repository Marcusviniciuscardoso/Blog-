const express = require('express')
const signUpController = require('../controllers/signUpController')
const signUpRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

const validationBody = (req, res, next) => {
  const { body } = req
  try {
    const requiredFields = ['name', 'surname', 'dateofbirth']
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === '') {
        return res.status(400).json({ message: `${field} undefined` })
      }
    }
    next()
  } catch (error) {
    console.error('Error to verify signup fields:', error)
    res.status(500).json({ message: 'Server internal error' })
  }
}

signUpRouter.post('/signUp', validationBody, async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const img = req.files.avatar
    const ext = img.mimetype.split('/')[1]
    const nome = `${uuidv4()}.${ext}`

    img.mv(`public/images/uploads/${nome}`, async (err) => {
      if (err) {
        console.error('Error saving file:', err)
        return res.status(500).json({ message: 'Error saving file' })
      }

      req.files.avatar = nome

      next()
    })
  } catch (error) {
    console.error('Error processing signup:', error)
    res.status(500).json({ message: 'Server internal error' })
  }
}, signUpController.combinedController)

module.exports = signUpRouter
