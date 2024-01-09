const express = require('express')
const createTopicController = require('../controllers/createTopicController')
const createTopicRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

const validationBody = (req, res, next) => {
  try {
    const { body } = req

    const requiredFields = ['title', 'subtitle', 'creationdate', 'text', 'profileid']

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === '') {
        return res.status(400).json({ message: `${field} undefined` })
      }
    }
    next()
  } catch (error) {
    console.error('Error to validate fields of create topic', error)
    res.status(500).json({ message: 'Server internal error' })
  }
}

createTopicRouter.post('/createTopic', validationBody, async (req, res, next) => {
  try {
    if (!req.files || !req.files.featuredimage) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const img = req.files.featuredimage
    const ext = img.mimetype.split('/')[1]
    const nome = `${uuidv4()}.${ext}`

    img.mv(`public/images/uploads/${nome}`, async (err) => {
      if (err) {
        console.error('Error saving file:', err)
        return res.status(500).json({ message: 'Error saving file' })
      }

      req.files.featuredimage = nome

      next()
    })
  } catch (error) {
    console.error('Error processing signup:', error)
    res.status(500).json({ message: 'Server internal error' })
  }
}, createTopicController.postCards)

module.exports = createTopicRouter
