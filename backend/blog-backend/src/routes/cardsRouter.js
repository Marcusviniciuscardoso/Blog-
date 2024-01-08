const express = require('express')
const cardRouter = express.Router()
const cardController = require('../controllers/cardsController')

cardRouter.get('/cardLandingPage', cardController.getCards)

module.exports = cardRouter
