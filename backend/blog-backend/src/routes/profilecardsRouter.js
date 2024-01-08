const express = require('express')
const profileCardRouter = express.Router()
const profileCardController = require('../controllers/profileCardController')

profileCardRouter.get('/profileCards/:id', profileCardController.getProfileCards)
profileCardRouter.delete('/profileCards/:id/cards/:cardId', profileCardController.deleteProfileCards)

module.exports = profileCardRouter
